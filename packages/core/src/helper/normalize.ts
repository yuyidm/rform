import type { Scope } from '../interfaces'

export type Normalizer = ((value: any, scope: Scope) => any) & {
    $$typeof?: symbol
}

export function isNormalizer(fn: any): fn is Normalizer {
    return fn && fn.$$typeof === Symbol.for('normalizer')
}

export function normalize(fn: Normalizer) {
    fn.$$typeof = Symbol.for('normalizer')
    return fn
}
