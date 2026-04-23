// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const gemini = "https://gemini.google.com/";
var clicked = false;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(gemini)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
      await chrome.scripting.removeCSS({
        files: ["unfocus-mode.css"],
        target: { tabId: tab.id },
      });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["activeScript.js"],
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
      await chrome.scripting.insertCSS({
        files: ["unfocus-mode.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
