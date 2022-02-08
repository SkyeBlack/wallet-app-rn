import { colors, otherStyles, baseStyles, fontStyles } from './common'

export const normalBtnView = {
    height: 66,
    ...baseStyles.containerPadding,
    ...baseStyles.flexCenter,
    backgroundColor: colors.white
}

export const normalBtnStyle = {
    width: '100%',
    ...baseStyles.flexCenter,
    height: 48,
    backgroundColor: colors.bgHighLight,
    borderRadius: otherStyles.samllRadius
}

export const normalBtnText = {
    ...fontStyles.normal,
    ...fontStyles.normalSize,
    color: colors.white
}

export const headerRightBtnText = {
    ...fontStyles.smallSize,
    ...fontStyles.normal,
    color: colors.fontHighLight
}

export const normalBtnDisabled = {
    backgroundColor: colors.bgHighLightO,
}