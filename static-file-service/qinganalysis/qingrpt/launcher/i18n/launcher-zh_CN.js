(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.launcher;
	oManager.registPackageResources(oPackage, 
	{
		checkExtReportAppRuntimeEvn:"正在检测金蝶云苍穹轻报表套件运行时环境...",
		startingExtReportApp:"正在启动金蝶云苍穹轻报表套件...",
		connectingExtReportApp:"正在连接金蝶云苍穹轻报表套件，根据您的网络环境，过程可能持续数十秒到几分钟，请稍作等待...",
		checkJRE:"运行环境检测",
		cancel:"取消",
		unableToCheckJREFromBrowser:"因浏览器差异，无法通过浏览器判断您的系统是否安装JRE(Java Runtime Environment)。",
		performFollowingOperations:"您可以做以下操作:",
		notInstalledJRE:"若您的系统没有安装JRE，请点击",
		download:"下载",
		installedJRE:"若您的系统已经安装JRE，请点击",
		openNewTab: "跳转",
		reconnect: "重新连接",
		proceeding: "继续访问被拦截的请求，然后点击",
		lastStep: "上一步",
		start:"启动",
		downloadJavaRuntime:"下载JRE(Java Runtime Environment)",
		downloadJavaDescription:"1、请您按当前所使用的操作系统类型，下载并执行Java安装程序。",
		downloadJavaDescription2: "2、打开Java控制面板，在“更新”页签中取消勾选“自动检查更新”",
		saveSetting: "并保存设置。",
		downloadList:"下载列表：",
		windows:"Windows系统",
		solaris:"Solaris系统",
		linux:"Linux系统",
		mac:"Mac系统",
		version32:"32位",
		version64:"64位",
		version64SPARC:"SPARC64位",
		afterInstalledJRE:"完成上述操作后，请点击 ",
		loading: "加载中",
		connectedExtReportApp:"连接金蝶云苍穹轻报表套件成功",
		failedToConnectQingReportAppReason: "连接金蝶云苍穹轻报表套件超时，原因可能是：",
		startingQingReport: "1、金蝶云苍穹轻报表套件正在启动中，您可以点击",
		notStartedQingReport: "2、金蝶云苍穹轻报表套件未启动，您可以点击",
		failToStartQingReport: "3、金蝶云苍穹轻报表套件启动失败，您可以点击",
		restart: "重新启动",
		downloadRunScript: "下载并运行脚本",
		switchToWindowsOs: "请在Windows环境下使用。"
	});
	
})();