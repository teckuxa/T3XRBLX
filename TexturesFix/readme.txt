To fix textures not working:
1) First get Fiddler
2) Then install their proxy
3) Go to Rules -> Customize Rules
4) Paste this exact code somewhere in the code but replace "YOUR .ROBLOXSECURITY COOKIE HERE" with your actual .ROBLOXSECURITY cookie, you can get it by right clicking on Roblox website -> Applications and pressing on ".RobloxSecurity"
" static function OnBeforeRequest(oSession: Session) {
		if (oSession.uriContains("roblox.com/asset/?id=") || oSession.uriContains("roblox.com/asset?id=")) {
			// Force HTTPS and use the AssetDelivery API which is more stable for legacy clients
			oSession.fullUrl = oSession.fullUrl.Replace("http://www.roblox.com/asset/?id=", "https://assetdelivery.roblox.com/v1/asset/?id=");
			oSession.fullUrl = oSession.fullUrl.Replace("https://www.roblox.com/asset/?id=", "https://assetdelivery.roblox.com/v1/asset/?id=");
    
			// Ensure the cookie is present for this specific request
			oSession.oRequest.headers.Remove("Cookie");
			oSession.oRequest.headers.Add("Cookie", ".ROBLOSECURITY=YOUR .ROBLOXSECURITY COOKIE HERE");"

It is needed to ensure you correctly get all asset id requests, if you ever face issues with normal roblox with this code, just go to documents -> fiddler2 -> scripts and delete "customrules.js" and it will automatically regenerate with default settings next time you run Fiddler