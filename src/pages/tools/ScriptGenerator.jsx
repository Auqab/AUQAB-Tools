import { useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

const scripts = {
  clean_temp: {
    name: "🧹 Clean Temporary Files",
    desc: "Removes temporary files from the system.",
    bat: `@echo off
echo Cleaning temporary files...
del /q /f /s %TEMP%\\*
echo Done.
pause`,
    ps1: `Write-Host "Cleaning temporary files..."
Remove-Item "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Done."`,
    sh: `#!/bin/bash
echo "Cleaning temporary files..."
rm -rf /tmp/*
echo "Done."`,
  },
  system_info: {
    name: "📊 System Information",
    desc: "Displays detailed system and hardware information.",
    bat: `@echo off
systeminfo
pause`,
    ps1: `Get-ComputerInfo`,
    sh: `#!/bin/bash
uname -a
lscpu
free -h`,
  },
  network_check: {
    name: "🌐 Network Check",
    desc: "Checks network connectivity and configuration.",
    bat: `@echo off
ipconfig
ping google.com
pause`,
    ps1: `Test-NetConnection google.com`,
    sh: `#!/bin/bash
ping -c 4 google.com`,
  },
  disk_cleanup: {
    name: "💾 Disk Cleanup",
    desc: "Cleans disk by removing cache and logs.",
    bat: `@echo off
cleanmgr /sagerun:1
pause`,
    ps1: `Clear-RecycleBin -Force
Remove-Item "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue`,
    sh: `#!/bin/bash
sudo apt clean
sudo journalctl --vacuum-time=3d`,
  },
  process_list: {
    name: "📋 Process List",
    desc: "Lists all running processes with details.",
    bat: `@echo off
tasklist
pause`,
    ps1: `Get-Process | Format-Table -AutoSize`,
    sh: `#!/bin/bash
ps aux`,
  },
  firewall_status: {
    name: "🔥 Firewall Status",
    desc: "Checks firewall status and rules.",
    bat: `@echo off
netsh advfirewall show allprofiles
pause`,
    ps1: `Get-NetFirewallProfile`,
    sh: `#!/bin/bash
sudo ufw status verbose`,
  },
  backup_files: {
    name: "📁 Backup Script",
    desc: "Creates a backup of specified folder.",
    bat: `@echo off
xcopy "C:\\Source" "D:\\Backup" /E /I /Y
echo Backup complete.
pause`,
    ps1: `Copy-Item "C:\\Source" -Destination "D:\\Backup" -Recurse -Force`,
    sh: `#!/bin/bash
cp -r /home/user/source /home/user/backup`,
  },
  restart_service: {
    name: "🔄 Restart Service",
    desc: "Restarts a specified system service.",
    bat: `@echo off
net stop "Spooler"
net start "Spooler"
echo Service restarted.
pause`,
    ps1: `Restart-Service -Name "Spooler"`,
    sh: `#!/bin/bash
sudo systemctl restart cups`,
  },
};

function ScriptGenerator() {
  const [selected, setSelected] = useState("clean_temp");
  const [type, setType] = useState("bat");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    const generated = scripts[selected]?.[type] || "";
    setScript(generated);
    trackEvent("script_generate", { tool: "script_generator", script: selected, os: type });
    setCopied(false);
  }

  function copyScript() {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    if (!script) return;
    const extension = type === "bat" ? ".bat" : type === "ps1" ? ".ps1" : ".sh";
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "auqab-script" + extension;
    link.click();
    URL.revokeObjectURL(url);
  }

  const currentScript = scripts[selected];

  return (
    <>
      <SEO
        title="Free Script Generator - Create Windows, Linux & PowerShell Scripts"
        description="Generate ready-to-use Windows Batch, PowerShell and Linux Shell scripts for automation tasks."
      />

      <section className="tool-page">
        <div className="password-card">
          <h1>💻 Script Generator</h1>
          <p className="tool-description">
            Create useful automation scripts for Windows, PowerShell and Linux.
            Select a template, choose your platform, and get a ready-to-use script.
          </p>

          {/* اختيار السكربت */}
          <div className="script-select">
            <label>Choose Script:</label>
            <select value={selected} onChange={(e) => { setSelected(e.target.value); setScript(""); }}>
              {Object.entries(scripts).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
            {currentScript && (
              <p className="script-desc">{currentScript.desc}</p>
            )}
          </div>

          {/* اختيار النظام */}
          <div className="script-select">
            <label>Platform:</label>
            <select value={type} onChange={(e) => { setType(e.target.value); setScript(""); }}>
              <option value="bat">🪟 Windows Batch (.bat)</option>
              <option value="ps1">💙 PowerShell (.ps1)</option>
              <option value="sh">🐧 Linux Shell (.sh)</option>
            </select>
          </div>

          {/* زر التوليد */}
          <button className="generate" onClick={generate}>
            ⚡ Generate Script
          </button>

          {/* عرض السكربت */}
          {script && (
            <div className="script-output">
              <textarea
                rows="14"
                value={script}
                readOnly
                className="output-textarea"
                spellCheck={false}
              />
              <div className="script-actions">
                <button className="generate" onClick={copyScript}>
                  {copied ? "✅ Copied!" : "📋 Copy Script"}
                </button>
                <button className="download-btn" onClick={download}>
                  ⬇ Download Script
                </button>
              </div>
            </div>
          )}

          <div className="info-section">
            <h2>About Script Generator</h2>
            <p>Create simple automation scripts for system tasks without writing code from scratch. Just select your task and platform.</p>

            <h2>Supported Platforms</h2>
            <ul>
              <li>🪟 Windows Batch (.bat)</li>
              <li>💙 PowerShell (.ps1)</li>
              <li>🐧 Linux Shell (.sh)</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <h3>Are generated scripts safe?</h3>
            <p>Scripts are designed for basic system tasks. Always review a script before running it, especially on production systems.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ScriptGenerator;
