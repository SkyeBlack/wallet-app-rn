export default {
    router: {
        createWallet: '创建钱包',
        backupMnemonic: '备份助记词',
        scanQrCode: '扫描二维码',
        walletManage: '钱包管理',
        walletDetail: '钱包详情',
        LeadPriKey: '导入{{chain}}钱包',
        exportPrikey: '导出私钥',
        backupPrikey: '备份私钥',
        assetManage: '资产管理',
        addAsset: '添加资产',
        transfer: '转账',
        receiving: '收款',
        addressBook: '地址簿',
        contacts: '联系人'
    },
    common: {
        copySuccess: '复制成功',
        cancel: '取消',
        ok: '确认',
        invalidAddress: '无效地址',
        save: '保存',
        deleteSuccess: '删除成功',
        deleteFailed: '删除失败',
        delete: '删除',
        complete: '完成',
        safeMsg1: '任何人，只要持有私钥、助记词，即可将资产转走',
        safeMsg2: '钱包密码仅用于私钥、助记词的加密和解密，密码只存储在手机上，请做好密码备份',
        safeMsg3: '请勿对私钥、助记词做好截图备份，避免被恶意软件截取',
        safeMsg4: '请正确抄写并保存在安全的地方，勿进行网络传输或存储',
        safeMsg5: '私钥、助记词一旦泄露，资产即可被他人掌控',
        address: '地址',
        emptyWalletName: '名称不能为空',
        share: '分享',
        copy: '复制',
        createWallet: '创建钱包',
        createWalletFailed: '创建失败',
    },
    createWallet: {
        nameMsg: '请输入12个字符以内的钱包名称',
        pwdMsg: '请输入8-20个字符以内的密码，且需包含字母、数字、特殊符号。',
        pwdMsg2: '密码必须包含字母、数字、特殊字符',
        pwdMsg3: '两次密码不一致，请重新输入。',
        createFailed: '创建失败',
        walletName: '钱包名称',
        walletNameP: '1~12 位字符',
        pwd: '密码',
        pwdP: '密码不能少于8位',
        pwd2P: '请重复输入密码',
        msg: '不少于8位字符，且需包含大小写字母、数字、符号。',
        msg1: '1.安全密码用于操作资金时的验证，保证资金安全',
        msg2: '2.安全密码用于私钥加密，保证私钥存储安全',
        msg3: '3.只在本地保存，一旦丢失无法找回密码密码',
        createWallet: '创建',
        createWalletPending: '创建中'
    },
    createFinish: {
        msg: '带有HD标识的钱包，可通过备份一次助记词，对当前钱包中所有网络下创建的地址进行通用管理'
    },
    backupStep1: {
        showMnemonic: '显示助记词'
    },
    backupStep2: {
        title: '请认真按顺序抄写下方12个助记词',
        text: '我们将在下一步验证',
        msg: '注意：',
        msg1: '请勿将助记词透露给任何人',
        msg2: '助记词一旦丢失，资产将无法恢复',
        msg3: '请勿通过截屏、网络传输的方式进行备份保存',
        msg4: '请不要轻易卸载钱包App',
        toCheck: '备份完成，进行验证'
    },
    backupStep3: {
        mneError: '助记词顺序输入错误，请重新输入！',
        text: '请将您抄下的12个单次按正确顺序输入至下方'
    },
    navbar: {
        wallet: '钱包',
        setting: '设置'
    },
    wallet: {
        accountBalance: '钱包余额',
        transfer: '转账',
        receiving: '收款',
        asset: '资产',
        changeAccount: '选择钱包'
    },
    receive: {
        scan: '扫一扫，向我付款',
        msg1: '仅支持{{chain}}资产',
        receiveAddress: '收款地址'
    },
    transfer: {
        amount: '数量',
        balance: '余额',
        gas: '网络费用',
        sure: '确定',
        coin: '选择币种',
        invalidAddress: '请输入正确的{{chain}}地址',
        invalidAmount: '最小可输入小数点后17位，最大可输入1千万',
        emptyPwd: '请输入密码',
        pwdError: '密码错误',
        transInitiated: '转账已发起',
        transBalanceLow: '余额不足',
        transTxError: '交易失败',
        comfirmTrans: '确认转账',
        walletPwd: '钱包安全密码'
    },
    walletManage: {
        addAccount: '添加钱包',
        leadPrikey: '私钥导入钱包',
        leadMne: '助记词导入钱包'
    },
    exportPriStep1: {
        emptyPwd: '密码不能为空',
        pwdError: '密码输入错误，请重新输入',
        inputPwd: '请输入安全密码',
        inputPwdP: '请输入钱包的安全密码',
        next: '下一步'
    },
    exportPriStep2: {
        msg: '请谨记以下安全要点',
        known: '我知道了'
    },
    exportPriStep3: {
        privateKey: '私钥',
        text: '您可以把私钥在纸质文本抄写，抄写完隔离网络保存，您应当保管好私钥。',
        backupComplete: '备份完成',
        careful: '注意',
        msg: '复制私钥是一个高风险的行为，请确认您知晓以下风险:',
        msg1: '1.您需要知晓，复制私钥后，私钥可能被剪贴板，输入法或其他第三方程序截取，导致您的私钥丢失。',
        msg2: '2.您需要知晓，复制私钥后，可能导致该私钥在网络中传输，被第三方截取。',
        msg3: '3.您需要知晓，可能存在未知手段，导致您的私钥在复制后泄露。',
        known: '我以知晓复制私钥带来的风险'
    },
    leadWallet: {
        leadPrikey: '私钥导入',
        leadPrikeyText: '通过输入明文助记词导入私钥',
        leadMnemonic: '助记词导入',
        leadMnemonicText: '通过输入明文助记词导入私钥'
    },
    leadPrivate: {
        privateKeyMsg: '私钥不能为空',
        mnemonicMsg: '助记词不能为空',
        leadFailed: '导入失败，请重新输入！',
        leadPriKey: '请输入明文私钥，请注意大小写',
        leadMnemonic: '请输入助记词，按空格做分隔',
        walletName: '设置钱包名',
        pwd: '安全密码',
        pwdP: '请输入密码',
        leadWallet: '导入钱包',
        emptyMne: '助记词不能为空',
        emptyPrikey: '私钥不能为空',
        existAccount: '账户已存在'
    },
    assetAdd: {
        manage: '管理',
        addSuccess: '添加成功',
        addFailed: '添加失败',
        tokenAddress: '代币地址',
        tokenAddressP: '代币合约地址',
        tokenName: '代币符号',
        tokenDecimals: '代币精度',
        confirmAdd: '确认添加'
    },
    assetManage: {
        addedAssets: '已添加资产'
    },
    scan: {
        msg1: '将二维码放入框内，即可自动扫描'
    },
    walletDetail: {
        manageWallet: '管理身份钱包',
        walletAddress: '钱包地址',
        exportPrikey: '导出私钥',
        exportMne: '导出助记词'
    },
    dapp: {
        title: '体验全新的DAPP浏览器',
        text: '可直接输入Dapp网址访问Dapp',
        recent: '最近'
    },
    browserTab: {
        changeWallet: '切换钱包',
        copyLink: '复制链接',
        refresh: '刷新'
    },
    setting: {
        walletManage: '钱包管理',
        addressBook: '地址薄',
        checkUpdate: '检查更新'
    },
    addressBook: {
        copyAddress: '复制地址',
        editContacts: '编辑'
    },
    addressBookEdit: {
        nameMsg: '请输入8-12位字符的联系人名称',
        addContactsSuccess: '添加联系人成功',
        contactsExist: '联系人地址已存在',
        noUpdate: '联系人未修改',
        updateSuccess: '更新联系人成功',
        contactsName: '联系人名称',
        contactsNameP: '请输入名称',
        chain: '网络',
        addressP: '扫描或者粘贴钱包地址'
    },
    addressBookList: {
        chooseContacts: '选择接收地址'
    }
}
