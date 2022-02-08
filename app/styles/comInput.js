import { colors, otherStyles, baseStyles, fontStyles } from './common'

export const normalInputStyle = {
    height: 48,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: colors.white,
    borderRadius: otherStyles.samllRadius,
    ...baseStyles.normalBorder,
    ...fontStyles.normal,
    ...fontStyles.smallSize,
    color: colors.fontDark
}