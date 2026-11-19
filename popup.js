const btn=document.getElementById("toggle");
const status=document.getElementById("status");
async function getTab(){const tabs=await chrome.tabs.query({active:true,currentWindow:true});return tabs[0]}
(async()=>{
 const tab=await getTab();
 if(!tab?.id||!tab.url||tab.url.startsWith("chrome://")||tab.url.startsWith("chrome-extension://")){status.textContent="Chrome internal pages cannot be styled.";btn.disabled=true;return}
 try{
  await chrome.scripting.executeScript({target:{tabId:tab.id},files:["content.js"]});
  const response=await chrome.tabs.sendMessage(tab.id,{type:"CT_GET_STATE"});
  btn.textContent=response?.enabled?"Disable Workspace":"Enable Workspace";
  status.textContent=response?.enabled?"Workspace is active on this site.":"Ready for "+new URL(tab.url).hostname;
 }catch(e){status.textContent="Could not access this tab. Reload it and try again.";btn.disabled=true}
})();
btn.addEventListener("click",async()=>{
 const tab=await getTab();if(!tab?.id)return;
 try{
  await chrome.scripting.executeScript({target:{tabId:tab.id},files:["content.js"]});
  const result=await chrome.tabs.sendMessage(tab.id,{type:"CT_TOGGLE"});
  btn.textContent=result?.enabled?"Disable Workspace":"Enable Workspace";
  status.textContent=result?.enabled?"Workspace enabled.":"Workspace disabled.";
 }catch(e){status.textContent="Toggle failed. Refresh the page and retry."}
});