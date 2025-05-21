import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip, Typography } from 'antd'
import classNames from 'classnames'
import React, { memo } from 'react'
import styles from './index.module.less'

export type ValidateStatus = 'success' | 'warning' | 'error' | 'validating'

export interface FormItemProps {
    type?: string
    label?: React.ReactNode
    tooltip?: React.ReactNode
    colon?: boolean
    required?: boolean
    validateStatus?: ValidateStatus
    help?: React.ReactNode
    extra?: React.ReactNode
    htmlFor?: string
    labelCol?: { span?: number, offset?: number }
    wrapperCol?: { span?: number, offset?: number }
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}

const defaultProps: Partial<FormItemProps> = {
    labelCol: { },
    wrapperCol: { },
}

const { Text } = Typography

const FormItem: React.FC<FormItemProps> = ({
    label,
    tooltip,
    required,
    colon = true,
    help,
    extra,
    validateStatus,
    labelCol = defaultProps.labelCol,
    wrapperCol = defaultProps.wrapperCol,
    children,
    className,
    style,
    htmlFor,
    type,
}) => {
    return (
        <div
            className={classNames(styles['form-item'], className)}
            style={style}
            data-type={type}
        >
            <Row align="top">
                <Col {...labelCol} className={styles['label-col']}>
                    <label htmlFor={htmlFor} className={classNames({ [styles.required]: required })}>
                        {label}
                        {colon && label ? '：' : ''}
                        {tooltip && (
                            <Tooltip title={tooltip}>
                                <InfoCircleOutlined style={{ marginLeft: 4 }} />
                            </Tooltip>
                        )}
                    </label>
                </Col>
                <Col {...wrapperCol} className={styles['wrapper-col']}>
                    <div className={styles.control}>{children}</div>
                    <div className={classNames(styles.help, styles[validateStatus!])}>
                        <Text
                            type={validateStatus === 'error' ? 'danger' : 'secondary'}
                        >
                            {help}
                        </Text>
                    </div>
                    {extra && <div className={styles.extra}>{extra}</div>}
                </Col>
            </Row>
        </div>
    )
}

const FormItemMemo = memo(FormItem)

FormItemMemo.displayName = 'FormItem'

export default FormItemMemo
