import { colors, otherStyles, fontStyles } from './common'

export const mneContainer = {
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
}

export const mneItem = {
    width: '33%',
    height: 60,
    backgroundColor: colors.bgLight,
    borderRadius: otherStyles.samllRadius,
    borderWidth: 1,
    borderColor: colors.borderLight
}

export const mneNum = {
    ...fontStyles.normal,
    ...fontStyles.tinySize,
    color: colors.fontGray,
    textAlign: 'right',
    paddingRight: 6
}

export const mneText = {
    ...fontStyles.normal,
    ...fontStyles.normalSize,
    color: colors.fontPrimary,
    textAlign: 'center'
}