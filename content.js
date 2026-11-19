(()=>{
 if(window.__corporateTragedyExtLoaded)return;window.__corporateTragedyExtLoaded=true;
 const host=location.hostname;
 const css=`
 :root{--ct-bg:#1e1e1e;--ct-panel:#252526;--ct-border:#3c3c3c;--ct-text:#cccccc;--ct-muted:#858585;--ct-blue:#007acc;--ct-hover:#2a2d2e}
 html.ct-workspace,html.ct-workspace body{background:var(--ct-bg)!important;color:var(--ct-text)!important}
 html.ct-workspace body{transition:background-color .18s ease}
 html.ct-workspace *{scrollbar-color:#424242 #1e1e1e}
 html.ct-workspace ::selection{background:#264f78;color:#fff}
 html.ct-workspace input,html.ct-workspace textarea{color:var(--ct-text)!important}
 html.ct-workspace a{color:#3794ff}
 #ct-workspace-widget{position:fixed;z-index:2147483647;right:16px;bottom:16px;display:flex;align-items:center;gap:8px;padding:8px 10px;background:#252526;border:1px solid #454545;border-radius:9px;box-shadow:0 8px 30px #0007;color:#ddd;font:12px/1.2 system-ui,sans-serif}
 #ct-workspace-widget .ct-logo{background:#007acc;color:white;border-radius:5px;width:22px;height:22px;display:grid;place-items:center;font-weight:800}
 #ct-workspace-widget button{border:0;border-radius:5px;background:#0e639c;color:white;padding:6px 9px;font-weight:600;cursor:pointer}
 #ct-workspace-widget button:hover{background:#1177b9}
 #ct-workspace-widget .ct-close{background:transparent;color:#aaa;font-size:16px;padding:3px}
 `;
 const style=document.createElement("style");style.id="ct-workspace-style";style.textContent=css;document.documentElement.appendChild(style);
 function setEnabled(on){document.documentElement.classList.toggle("ct-workspace",on);let widget=document.getElementById("ct-workspace-widget");if(on&&!widget){widget=document.createElement("div");widget.id="ct-workspace-widget";widget.innerHTML='<span class="ct-logo">CT</span><span>Workspace</span><button class="ct-off">Disable</button><button class="ct-close" title="Hide widget">×</button>';document.body.appendChild(widget);widget.querySelector(".ct-off").onclick=()=>setEnabled(false);widget.querySelector(".ct-close").onclick=()=>widget.remove()}else if(!on&&widget)widget.remove();chrome.storage.local.set({["ct:"+host]:on})}
 chrome.storage.local.get("ct:"+host,values=>{if(values["ct:"+host])setEnabled(true);else style.remove()});
 chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{if(msg.type==="CT_TOGGLE"){const next=!document.documentElement.classList.contains("ct-workspace");if(next&&!document.getElementById("ct-workspace-style"))document.documentElement.appendChild(style);setEnabled(next);sendResponse({enabled:next})}if(msg.type==="CT_GET_STATE")sendResponse({enabled:document.documentElement.classList.contains("ct-workspace")});return true});
})();