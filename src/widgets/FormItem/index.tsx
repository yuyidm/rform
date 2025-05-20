import { Col, Row } from 'antd'
import classNames from 'classnames'
import React, { memo } from 'react'
import styles from './index.module.less'

export interface FormItemProps {
    label?: React.ReactNode
    required?: boolean
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
    labelCol: {},
    wrapperCol: {},
}

const FormItem: React.FC<FormItemProps> = ({
    label,
    required,
    help,
    extra,
    htmlFor,
    labelCol = defaultProps.labelCol,
    wrapperCol = defaultProps.wrapperCol,
    children,
    className,
    style,
}) => {
    return (
        <div className={classNames(styles.formItem, className)} style={style}>
            <Row align="top">
                {label && (
                    <Col {...labelCol} className={styles.label}>
                        <label htmlFor={htmlFor}>
                            {required && <span className={styles.required}>*</span>}
                            {label}
                        </label>
                    </Col>
                )}
                <Col {...wrapperCol} className={styles.wrapper}>
                    <div className={styles.control}>
                        <div className={styles.controlContent}>
                            {children}
                        </div>
                        {help && <div className={styles.help}>{help}</div>}
                        {extra && <div className={styles.extra}>{extra}</div>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const FormItemMemo = memo(FormItem)

FormItemMemo.displayName = 'FormItem'

export default FormItemMemo
