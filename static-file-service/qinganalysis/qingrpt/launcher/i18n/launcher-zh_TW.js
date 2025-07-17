(function()
{
	var oManager = com.kingdee.bos.qing.framework.common.MultilanguageManager;
	var oPackage = com.kingdee.bos.extreport.launcher;
	oManager.registPackageResources(oPackage, 
	{
		checkExtReportAppRuntimeEvn:"正在檢測金蝶云蒼穹輕報表套件運行時環境...",
		startingExtReportApp:"正在啟動金蝶云蒼穹輕報表套件...",
		connectingExtReportApp:"正在連接金蝶云蒼穹輕報表套件，根據您的網絡環境，過程可能持續數十秒到幾分鐘，請稍作等待...",
		checkJRE:"運行環境檢測",
		cancel:"取消",
		unableToCheckJREFromBrowser:"因瀏覽器差異，無法通過瀏覽器判斷您的系统是否安裝JRE(Java Runtime Environment)。",
		performFollowingOperations:"您可以做一下操作:",
		notInstalledJRE:"若您的系統沒有安裝JRE，請點擊",
		download:"下載",
		installedJRE:"若您的系統已经安裝JRE，请点击",
		openNewTab: "跳轉",
		reconnect: "重新連接",
		proceeding: "繼續訪問被攔截的請求，然後點擊",
		lastStep: "上一步",
		start:"啟動",
		downloadJavaRuntime:"下載JRE(Java Runtime Environment)",
		downloadJavaDescription:"1、請您根據您當前所用的操作系統類型，下載并執行Java安裝程序。",
		downloadJavaDescription2: "2、打開Java控制面板，在“更新”頁簽中取消勾選“自動檢查更新”",
		saveSetting: "並保存設置。",
		downloadList:"下載列表：",
		windows:"Windows系統",
		solaris:"Solaris系統",
		linux:"Linux系統",
		mac:"Mac系統",
		version32:"32位",
		version64:"64位",
		version64SPARC:"SPARC64位",
		afterInstalledJRE:"完成上述操作后，请點擊 ",
		loading: "加載中",
		connectedExtReportApp:"連接金蝶云蒼穹輕報表套件成功",
		failedToConnectQingReportAppReason: "連接金蝶云蒼穹輕報表套件超时，原因可能是：",
		startingQingReport: "1、金蝶云蒼穹輕報表套件正在啟動中，您可以點擊",
		notStartedQingReport: "2、金蝶云蒼穹輕報表套件未啟動，您可以點擊",
		failToStartQingReport: "3、金蝶云蒼穹輕報表套件啟動失敗，您可以點擊：",
		restart: "重新啟動",
		downloadRunScript: "下載並運行腳本",
		switchToWindowsOs: "請在Windows環境下使用。"
	});
	
})();