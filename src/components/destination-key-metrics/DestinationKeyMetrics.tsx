import * as React from 'react';
import { icons } from '@brandwatch/axiom-materials';
import viziaFormat from '@vizia/format';
import { Styled } from 'direflow-component';
import htmlReactParser from 'html-react-parser';
import styles from './DestinationKeyMetrics.css';

interface IConfiguration {
    bwApiRootUrl: string;
    destTarget: string;
    endDate: string;
    filter: {
        queryId: number[];
    };
    locale: string;
    projectId: number;
    startDate: string;
    timezone: string;
    token: string;
}

interface IData {
    comparisonValue: number;
    currency?: boolean;
    currencySymbol?: string;
    format?: string;
    invertSentiment?: boolean;
    label: string;
    value: number;
}

interface IIcon {
    body: string;
    height: string;
    viewBox: string;
    width: string;
}

interface IDestinationKeyMetricsProps {
    configuration: IConfiguration;
    data: IData;
}

const DestinationKeyMetrics: React.FunctionComponent<IDestinationKeyMetricsProps> = (props): React.ReactElement => {
    const getModifiers = (baseClass: string, modifiers: { long: boolean }): string => {
        return Object.entries(modifiers)
            .filter((entry) => entry[1])
            .map((entry) => entry[0])
            .map((modifierClass) => `${baseClass}--${modifierClass}`)
            .join(` `);
    };

    const getProgressValue = (value: number, comparisonValue: number) => Math.abs((value - comparisonValue) / comparisonValue);

    const getProgressSentimentModifier = (value: number, comparisonValue: number, invertSentiment = false) => {
        const a = invertSentiment ? comparisonValue : value,
            b = invertSentiment ? value : comparisonValue;

        if (a < b) {
            return `negative`;
        } else if (a > b) {
            return `positive`;
        }

        return `equal`;
    };

    const getProgressChangeIcon = (value: number, comparisonValue: number) => {
        const a = value,
            b = comparisonValue;

        if (a < b) {
            return icons[`arrow-down-right`];
        } else if (a > b) {
            return icons[`arrow-up-right`];
        }

        return icons[`chevron-right`];
    };

    const iconTemplate = (icon: IIcon) => <svg className={`icon`} viewBox={icon.viewBox}>{htmlReactParser(icon.body)}</svg>;

    const keyMetricLabelTemplate = () => <div className={`key-metric__label`}>{props.data.label}</div>;

    const keyMetricProgressTemplate = (): React.ReactElement => {
        const {
            configuration,
            data
        } = props;

        const progressChangeIcon = getProgressChangeIcon(data.value, data.comparisonValue);

        const formattedProgress: string = viziaFormat(getProgressValue(data.value, data.comparisonValue), {
            format: `percent`,
            locale: configuration.locale,
            mantissa: 0,
            output: `html`
        });

        const modifiers = [
                getProgressSentimentModifier(data.value, data.comparisonValue, data.invertSentiment)
            ]
            .filter((modifier) => modifier)
            .map((modifier) => `progress--${modifier}`)
            .join(` `);

        return (
            <div className={`key-metric__progress`}>
                <span className={`progress ${modifiers}`}>
                    <span className={`progress__icon`}>{iconTemplate(progressChangeIcon)}</span>
                    <span className={`progress__value`}>
                        {htmlReactParser(formattedProgress)}
                    </span>
                </span>
            </div>
        );
    };

    const keyMetricHeaderTemplate = (): React.ReactElement | undefined => {
        const { data } = props;

        if (!data.label && data.comparisonValue === undefined) {
            return;
        }

        return (
            <div className={`key-metric__header`}>
                {data.label ? keyMetricLabelTemplate() : ``}
                {data.comparisonValue !== undefined && data.format !== `text` ? keyMetricProgressTemplate() : ``}
            </div>
        );
    };

    const keyMetricValueTemplate = (): React.ReactElement => {
        const {
            configuration,
            data
        } = props;

        const formattedValue: string = data.format === `text` ? data.value : viziaFormat(data.value, {
            format: data.format,
            currency: data.currency,
            currencySymbol: data.currencySymbol,
            locale: configuration.locale,
            output: `html`
        });

        const modifiers = getModifiers(`key-metric__value`, {
            long: data.format === `text` || `${formattedValue}`.replace(/<[^>]+>/g, ``).length >= 10
        });

        return (
            <div className={`key-metric__value ${modifiers}`}>
                {htmlReactParser(formattedValue)}
            </div>
        );
    };

    return (
        <Styled scoped={false}
            styles={styles}
        >
            <div className={`key-metric-container`}>
                <div className={`key-metric`}>
                    {keyMetricHeaderTemplate()}
                    {keyMetricValueTemplate()}
                </div>
            </div>
        </Styled>
    );
};

export default DestinationKeyMetrics;
