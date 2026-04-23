(() => {
  const applyAccordion = () => {
    document.querySelectorAll("response-container").forEach((container) => {
      if (container.closest(".extension-chat-acordion-item")) return;

      const headerText = traverse(container) || "Show Response";

      const mainItem = document.createElement("div");
      mainItem.classList.add("extension-chat-acordion-item");

      const contentWrapper = document.createElement("div");
      contentWrapper.classList.add("extension-chat-accordion-wrapper");

      const button = document.createElement("button");
      button.classList.add("extension-chat-accordion-header");
      button.innerText = headerText.substring(0, 60) + "...";

      container.parentNode.insertBefore(mainItem, container);
      mainItem.appendChild(button);
      mainItem.appendChild(contentWrapper);
      contentWrapper.appendChild(container);

      button.addEventListener("click", () => {
        mainItem.classList.toggle("active");
      });
    });
  };

  applyAccordion();

  const observer = new MutationObserver((mutations) => {
    clearTimeout(window.accordionTimeout);
    window.accordionTimeout = setTimeout(applyAccordion, 500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function traverse(node) {
    if (node.children.length > 0) {
      for (const child of node.children) {
        if (child.nodeName === "P") {
          return child.innerText;
        } else {
          const res = traverse(child);
          if (res) return res;
        }
      }
    }
  }
})();