/**
 * TODO
 * 1. 检查交易状态
 */

import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useContract from '../../../utils/hooks/useContract'
import { ethers } from 'ethers'
import { getName } from '../../../utils'
import { Year } from './Year'
import dayjs from 'dayjs'
import { ONE_YEAR_SECONDS } from '../../../utils/constants'
import { Steps, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from '../../../utils/hooks'

const { Step } = Steps

const getStage = k => {
  const s = localStorage.getItem(k)

  if (s) {
    return JSON.parse(s)
  } else {
    return {
      step: 0,
      years: 1,
      secondsPassed: 0,
      secret: '',
      waitUntil: 0,
      commitmentExpirationDate: '',
      minAge: 0,
      maxAge: 0,
    }
  }
}

export const Register = () => {
  const { domain } = useParams()
  const { provider } = useWallet()
  const { contract } = useContract('ETHRegistrarController')
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const name = useMemo(() => getName(domain), [domain])
  const KEY = `cns-register-${name}`
  const STEPS = useMemo(() => {
    return [
      {
        title: t('register.step0.title'),
        desc: t('register.step0.desc'),
      },
      {
        title: t('register.step1.title'),
        desc: t('register.step1.desc'),
      },
      {
        title: t('register.step2.title'),
        desc: t('register.step2.desc'),
      },
    ]
  }, [i18n.language])

  const defaultStage = useMemo(() => {
    return getStage(KEY)
  }, [KEY])

  const [loading, setLoading] = useState(false)
  const [txing, setTxing] = useState(false)
  const [years, setYears] = useState(() => defaultStage.years)
  const [stage, setStage] = useState(() => defaultStage)

  const getWaitingInfo = _stage => {
    const stage = _stage || defaultStage
    const diff = dayjs.utc().diff(dayjs.utc(stage.waitUntil))
    const secondsPassed = Math.floor(stage.minAge + diff / 1000)

    return {
      diff,
      percent:
        secondsPassed >= stage.minAge
          ? 100
          : Math.floor((secondsPassed / stage.minAge) * 100),
      secondsPassed: secondsPassed >= stage.minAge ? 60 : secondsPassed,
    }
  }

  useEffect(async () => {
    let a = true

    if (stage.step === 3) {
      a = false
    } else if (stage.step === 2) {
      a = await contract.available(name)
    }

    if (!a) {
      navigate(`/name/${domain}/details`)
    }

    return a
  }, [stage.step])

  useEffect(() => {
    async function fn() {
      const stage = getStage(KEY)

      // has committed
      if (stage.secret) {
        // dayjs.utc() replace with block.timestamp is better
        const { diff, secondsPassed, percent } = getWaitingInfo(stage)

        if (percent === 100) {
          const s = {
            ...stage,
            secondsPassed,
            step: 2,
          }

          localStorage.setItem(KEY, JSON.stringify(s))
          setStage(s)
        } else {
          const s = {
            ...stage,
            secondsPassed,
          }

          localStorage.setItem(KEY, JSON.stringify(s))
          setStage(s)

          const t = setTimeout(() => {
            fn()
          }, 1000)

          return () => {
            clearTimeout(t)
          }
        }
      } else {
        localStorage.setItem(KEY, JSON.stringify(stage))
      }
    }
    fn().catch(e => console.log('Register error: ', e))
  }, [name, stage.step])

  useEffect(() => {
    if (years !== stage.years) {
      setYears(stage.years)
    }
  }, [stage.years])

  const handleStageOfCommit = async () => {
    try {
      setLoading(true)

      const signer = provider.getSigner()

      const owner = await signer.getAddress()

      const secret = ethers.utils.formatBytes32String(Math.random().toString())

      const commitment =
        getStage(KEY).commitment ||
        (await contract.makeCommitment(name, owner, secret))

      const tx = await contract.commit(commitment)

      setTxing(true)
      await tx.wait()
      setTxing(false)

      const [_min, _max, _t] = await Promise.all([
        (await contract.minCommitmentAge()).toString(),
        (await contract.maxCommitmentAge()).toString(),
        (await contract.commitments(commitment)).toString(),
      ])

      const t = Number(_t)
      const min = Number(_min)
      const max = Number(_max)

      const stage = {
        step: 1,
        secondsPassed: 0,
        secret: secret,
        years: years,
        waitUntil: (t + min) * 1000,
        commitmentExpirationDate: dayjs.utc((t + max) * 1000).format(),
        commitment,
        maxAge: max,
        minAge: min,
      }

      localStorage.setItem(KEY, JSON.stringify(stage))

      setStage(stage)

      setLoading(false)
    } catch (e) {
      console.log('handleStageOfCommit error: ', e)
      setTxing(false)
      setLoading(false)
    }
  }

  const handleStageOfRegister = async () => {
    try {
      setLoading(true)

      const signer = provider.getSigner()
      const yearSeconds = years * ONE_YEAR_SECONDS

      const owner = await signer.getAddress()
      const price = await contract.rentPrice(name, yearSeconds)

      const tx = await contract.register(
        name,
        owner,
        years * ONE_YEAR_SECONDS,
        stage.secret,
        {
          value: price,
          gasPrice: ethers.utils.parseUnits('1', 9),
          gasLimit: 15000000,
        },
      )
      setTxing(true)
      await tx.wait()
      setTxing(false)

      const s = {
        ...stage,
        step: 3,
      }

      localStorage.setItem(KEY, JSON.stringify(s))
      setStage(s)

      setLoading(false)
    } catch (e) {
      console.log('handleStageOfRegister error: ', e)
      setTxing(false)
      setLoading(false)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    if (stage.step === 0) {
      await handleStageOfCommit()
    } else if (stage.step === 2) {
      await handleStageOfRegister()
    }
    setLoading(false)
  }

  const { diff, secondsPassed, percent } = getWaitingInfo(stage)

  return (
    <div className="p-4">
      <Helmet>
        <title>Name / Register</title>
      </Helmet>

      <span>Name is: {name}</span>
      <div className="pb-4"></div>
      <Year
        name={name}
        years={years}
        onChange={setYears}
        disabled={stage.step !== 2}
      ></Year>
      <div className="pb-4"></div>
      <Steps
        current={stage.step}
        percent={stage.step === 1 ? percent : undefined}
      >
        {STEPS.map((s, i) => (
          <Step
            key={s.title}
            title={s.title}
            subTitle={
              i === 1 && stage.step === 1 && stage.minAge - secondsPassed
                ? `${t('register.step1.left')}${stage.minAge - secondsPassed}s`
                : undefined
            }
            description={s.desc}
          />
        ))}
      </Steps>
      <div className="pb-4"></div>
      <Button
        type="primary"
        onClick={handleClick}
        loading={loading}
        hidden={stage.step === 1}
      >
        {STEPS[stage.step]?.title}
      </Button>
      <div className="pr-4"></div>
      {txing && 'tx excuting...'}
    </div>
  )
}
