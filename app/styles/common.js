/**
 * Common styles and variables
 */

/**
 * Map of color names to HEX values
 */
export const colors = {
    fontPrimary: '#222222',
    fontDark: '#333333',
    fontGray: '#909090',
    fontHighLight: '#3E5CF9',
    white: '#ffffff',
    bgHighLight: '#0059E7',
    bgHighLightO: 'rgba(0,89,231,0.7)',
    bgLight: '#F7FBFE',
    bgLight2: 'rgba(255, 255, 255, 0.5)',
    bgLight3: 'rgba(204, 204, 204, 0.5)',
    bgDark: 'rgba(0, 0, 0, 0.5)',
    bgDark2: 'rgba(0, 0, 0, 0.12)',
    borderLight: '#E8E8E8',
    borderLight2: '#E3E3E3',
    borderLight3: '#DFDFDF',
    borderLight4: 'rgba(221, 221, 221, 0.3)',
    bgNormal: '#F9F9F9',
    bgNormal2: '#F5F6F8'
};

export const otherStyles = {
    samllRadius: 6,
    normalRadius: 8
}

/**
 * Map of reusable base styles
 */
export const baseStyles = {
    flexGrow: {
        flex: 1
    },
    flexStatic: {
        flex: 0
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerPadding: {
        paddingLeft: 20,
        paddingRight: 20
    },
    tinyPadding: {
        paddingLeft: 10,
        paddingRight: 10
    },
    normalBorder: {
        borderWidth: 1,
        borderColor: "#E3E3E3"
    },
    disabledStyle: {
        backgroundColor: '#E8E8E8'
    }
};

/**
 * Map of reusable fonts
 */
export const fontStyles = {
    normal: {
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontWeight: '400'
    },
    medium: {
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontWeight: '500'
    },
    tinySize: {
        fontSize: 12
    },
    smallSize: {
        fontSize: 14
    },
    normalSize: {
        fontSize: 16
    }
};
