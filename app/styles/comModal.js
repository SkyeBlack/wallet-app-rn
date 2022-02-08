import { winWidth } from '../assets/js/AdapterUtil'
import { colors, baseStyles, otherStyles, fontStyles } from './common'

/**
 * bottom modal
 */
export const bottomModal = {
    ...baseStyles.flexGrow,
    justifyContent: 'flex-end',
    backgroundColor: colors.bgDark
}

export const bottomModalContainer = {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: colors.bgDark2,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: colors.white,
}

/**
 * middle modal
 */
export const middleModal = {
    ...baseStyles.flexGrow,
    ...baseStyles.flexCenter,
    backgroundColor: colors.bgDark
}

export const middleModalContainer = {
    width: '90%',
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
}

export const middleModalTitle = {
    ...fontStyles.smallSize,
    ...fontStyles.normal,
    color: colors.fontDark
}

export const middleModalTwoBtn = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
}

export const middleModalBtnLeft = {
    width: winWidth * 0.45 - 30,
    height: 40,
    ...baseStyles.flexCenter,
    borderWidth: 1,
    borderColor: colors.bgHighLight,
    borderRadius: otherStyles.samllRadius
}

export const middleModalBtnLeftText = {
    ...fontStyles.normalSize,
    ...fontStyles.normal,
    color: colors.bgHighLight
}

export const middleModalBtnRight = {
    width: winWidth * 0.45 - 30,
    height: 40,
    ...baseStyles.flexCenter,
    backgroundColor: colors.bgHighLight,
    borderRadius: otherStyles.samllRadius
}

export const middleModalBtnRightText = {
    ...fontStyles.normalSize,
    ...fontStyles.normal,
    color: colors.white
}

/**
 * modal list
 */
export const mlMainContainer = {
    ...baseStyles.flexGrow
}

export const mlTitleView = {
    height: 57,
    ...baseStyles.flexCenter
}

export const mlTitle = {
    ...fontStyles.normalSize,
    ...fontStyles.normal,
    color: colors.fontPrimary
}

export const mlItem = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    ...baseStyles.containerPadding,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 10,
    backgroundColor: colors.bgNormal,
    borderRadius: 7
}

export const mlItemLeft = {
    flexDirection: 'row',
    alignItems: 'center',
}

export const mlLeftImg = {
    width: 30,
    height: 30,
    marginRight: 6
}

export const mlLeftLabel = {
    paddingBottom: 7,
    ...fontStyles.smallSize,
    ...fontStyles.normal,
    color: colors.fontDark
}

export const mlLeftText = {
    ...fontStyles.tinySize,
    ...fontStyles.normal,
    color: colors.fontGray
}

export const mlCheckImg = {
    width: 20,
    height: 20
}