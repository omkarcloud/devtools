import NumberField from '../../components/inputs/NumberField'
import Seo from '../../components/Seo'
import { useState } from 'react'
import UnAuthedLanding from '../../layouts/UnAuthedLanding'
import { H1Text } from '../../components/H1Text'
import AuthedDashboard from '../../layouts/AuthedDashboard'

import { EuiBasicTable, EuiCard, EuiFormRow } from '@elastic/eui'
import React from 'react'

/**
 * Create Loan Object with all installments and sum of interest
 *
 * @param {number} amount                   full amount of Loan
 * @param {number} installmentsNumber       number of installments
 * @param {number} interestRate             yearly interest rate in percent (8.5)
 *
 * @return {object}
 */
function Loan(amount, installmentsNumber, interestRate) {
    /** Checking params */
    if (!amount ||
        !installmentsNumber ||
        !interestRate) {
        throw new Error(`wrong parameters: ${amount} ${installmentsNumber} ${interestRate}`)
    }

    const installments = []
    let interestSum = 0
    let principalSum = 0
    let sum = 0

    for (let i = 0; i <= installmentsNumber; i++) {
        const inst = getNextInstallment(
            amount, installmentsNumber, interestRate, principalSum, interestSum
        )

        sum += inst.installment
        principalSum += inst.principal
        interestSum += inst.interest
        /** adding lost sum on rounding */
        if (i === installmentsNumber - 1) {
            principalSum += inst.remain
            sum += inst.remain
            inst.remain = 0
        }

        //@ts-ignore
        inst.id = i + 1
        //@ts-ignore
        installments.push(inst)
    }

    return {
        installments: installments,
        amount: rnd(amount),
        interestSum: rnd(interestSum),
        principalSum: rnd(principalSum),
        sum: rnd(sum)
    }
}

/**
 * Method to getting next installment
 * @param {number} amount
 * @param {number} installmentsNumber
 * @param {number} interestRate
 * @param {number} principalSum
 * @param {number} interestSum
 *
 * @returns {{ principal: number, interest: number, installment: number, remain: number, interestSum: number }}
 */
const getNextInstallment = (
    amount, installmentsNumber, interestRate, principalSum, interestSum
) => {
    const monthlyInterestRate = interestRate / (12 * 100)

    const irmPow = Math.pow(1 + monthlyInterestRate, installmentsNumber)
    const installment = rnd(amount * ((monthlyInterestRate * irmPow) / (irmPow - 1)))
    const interest = rnd((amount - principalSum) * monthlyInterestRate)
    const principal = installment - interest

    return {
        principal: principal,
        interest: interest,
        installment: installment,
        remain: amount - principalSum - principal,
        interestSum: interestSum + interest
    }
}

function rnd(num) {
    return Math.round(num * 100) / 100
}

function emiToHtmlTable(loan, params) {


    params = {}
    params.formatMoney = function (num) {
        return num.toFixed(2)
    }
    var fm = params.formatMoney


    const columns = [
        {
            field: 'id',
            name: '#',
            // render: fm,
            footer: () => <span>{'Total'} </span>
        },
        {
            field: 'principal',
            name: 'Principal',
            render: fm,
            footer: () => <span>{fm(loan.principalSum)} </span>
        },
        {
            field: 'interest',
            name: 'Interest',
            render: fm,

            footer: () => <span>{fm(loan.interestSum)} </span>
        },
        {
            field: 'installment',
            name: 'Installment',
            render: fm,

            footer: () => <span>{fm(loan.sum)} </span>
        },
        {
            field: 'remain',
            name: 'Remain',
            render: fm,

        },
        {
            field: 'interestSum',
            render: fm,
            name: 'Interest Sum',
        },
    ]

    return <EuiBasicTable
        tableCaption="Demo of EuiBasicTable with footer"
        items={loan.installments}
        columns={columns}
    />

}

const Content = () => {

    const [amount, setamount] = useState(null)
    const [interest, setinterest] = useState(null)
    const [months, setmonths] = useState(null)

    let output = (() => {
        try {
            const emi = Loan(amount, months, interest)
            return emiToHtmlTable(emi, {})
        } catch (e) {
            return null
        }
    })()

    return (
        <>
            <H1Text className='py-8' content="EMI Calculator" />
            <div className="page-card-wrapper px-8">
                <div className='space-y-8'>
                    <EuiCard title="Input" className=''>
                        <EuiFormRow label="Loan Amount" fullWidth>
                            <NumberField
                                value={amount}
                                min={1}
                                onChange={e => setamount(e)}
                                fullWidth
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Annual Interest Rate" fullWidth>
                            <NumberField
                                value={interest}
                                min={1}
                                onChange={e => setinterest(e)}
                                fullWidth
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Loan Duration (months)" fullWidth>
                            <NumberField
                                value={months}
                                min={1}
                                onChange={e => setmonths(e)}
                                fullWidth
                            />
                        </EuiFormRow>
                    </EuiCard>
                    {output && <EuiCard title="Output" >
                            {output}
                    </EuiCard>}
                </div>
            </div>
        </>
    )
}



const Page = ({ is_authenticated }) => {
    const Component = is_authenticated ? AuthedDashboard : UnAuthedLanding

    return (
        <>
            <Seo hasChat title="EMI Calculator" description='Calculate your EMI Online using our EMI Calculator' />

            <Component>
                <Content />
            </Component>
        </>
    )
}

export default Page
