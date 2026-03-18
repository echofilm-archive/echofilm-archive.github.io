(() => {
  const root = document.querySelector("[data-about-prototype]");
  if (!root) {
    return;
  }

  const groups = [
    {
      id: "about1",
      index: "01",
      title: "10분 동안의 최선의 의도",
      heading: "10분 동안의 최선의 의도",
      items: [
        { href: "/about1_1", label: "소개", meta: "10분 동안의 최선의 의도 1" },
        { href: "/about1_2", label: "KINO", meta: "10분 동안의 최선의 의도 2" },
        { href: "/about1_3", label: "작가노트", meta: "10분 동안의 최선의 의도 3" },
        { href: "/about1_4", label: "인터뷰 A", meta: "10분 동안의 최선의 의도 4" },
        { href: "/about1_5", label: "인터뷰 B", meta: "10분 동안의 최선의 의도 5" },
        { href: "/about1_6", label: "인터뷰 C", meta: "10분 동안의 최선의 의도 6" },
        { href: "/about1_7", label: "인터뷰 D", meta: "10분 동안의 최선의 의도 7" },
        { href: "/about1_8", label: "인터뷰 E", meta: "10분 동안의 최선의 의도 8" },
        { href: "/about1_9", label: "인터뷰 F", meta: "10분 동안의 최선의 의도 9" }
      ]
    },
    {
      id: "about2",
      index: "02",
      title: "영화작업",
      heading: "영화작업",
      items: [
        { href: "/about2_1", label: "인터뷰", meta: "영화작업 1" },
        { href: "/about2_2", label: "태백산맥", meta: "영화작업 2" },
        { href: "/about2_3", label: "노래에서", meta: "영화작업 3" },
        { href: "/about2_4", label: "조명부 생활", meta: "영화작업 4" }
      ]
    },
    {
      id: "about3",
      index: "03",
      title: "로드쇼 기사 모음",
      heading: "로드쇼 기사 모음",
      items: [
        { href: "/about3_01", label: "1989.10", meta: "뉴욕 견학기" },
        { href: "/about3_03", label: "1989.11", meta: "제26회 뉴욕 영화제" },
        { href: "/about3_02", label: "1990.03", meta: "해피 뉴욕시네마" },
        { href: "/about3_05", label: "1990.06", meta: "행크스 vs 라이언" },
        { href: "/about3_06", label: "1990.07", meta: "악몽보다 낯설은" },
        { href: "/about3_09", label: "1990.08", meta: "대부 III" },
        { href: "/about3_07", label: "1990.10", meta: "뉴욕의 가을" },
        { href: "/about3_10", label: "1990.10 B", meta: "거미공포증" },
        { href: "/about3_11", label: "1991.01", meta: "베스트 10" },
        { href: "/about3_17", label: "1991.03", meta: "뉴시네마 1991" },
        { href: "/about3_12", label: "1991.04", meta: "Coming soon" },
        { href: "/about3_15", label: "1991.10", meta: "Interview 1" },
        { href: "/about3_13", label: "1991.11", meta: "International Film Festival" },
        { href: "/about3_14", label: "1991.11 B", meta: "Cineaste interview" },
        { href: "/about3_19", label: "1991.11 C", meta: "뉴욕 필름 페스티발" },
        { href: "/about3_22", label: "1991.12", meta: "NY Best 10" },
        { href: "/about3_16", label: "1991.12 B", meta: "헐리우드 시나리오" },
        { href: "/about3_18", label: "1991.12 C", meta: "제임스 카메론" },
        { href: "/about3_20", label: "1991.12 D", meta: "천재소년 테이트" },
        { href: "/about3_21", label: "1992.01", meta: "Hook" },
        { href: "/about3_04", label: "특집 1", meta: "다이하드2" },
        { href: "/about3_08", label: "특집 2", meta: "브루클린으로 가는 마지막 비상구" }
      ]
    }
  ];

  const state = {
    groupId: "about1",
    itemHref: "/about1_1"
  };

  let pendingRequestId = 0;

  const groupsTarget = root.querySelector("[data-about-groups]");
  const tabsTarget = root.querySelector("[data-about-tabs]");
  const headingTarget = root.querySelector("[data-about-heading]");
  const panelIndexTarget = root.querySelector("[data-about-index]");
  const panelTitleTarget = root.querySelector("[data-about-panel-title]");
  const documentTarget = root.querySelector("[data-about-document]");
  const relatedTarget = root.querySelector("[data-about-related]");

  function getGroup() {
    return groups.find((group) => group.id === state.groupId) || groups[0];
  }

  function getItem(group) {
    return group.items.find((item) => item.href === state.itemHref) || group.items[0];
  }

  function renderGroups() {
    groupsTarget.innerHTML = groups
      .map((group) => {
        const active = group.id === state.groupId ? " is-active" : "";
        return `
          <li>
            <button type="button" class="about-prototype-group-button${active}" data-group-id="${group.id}">
              <span class="about-prototype-group-index">${group.index}</span>
              <span class="about-prototype-group-title">${group.title}</span>
            </button>
          </li>
        `;
      })
      .join("");
  }

  function renderTabs(group) {
    tabsTarget.innerHTML = group.items
      .map((item) => {
        const active = item.href === state.itemHref ? " is-active" : "";
        return `
          <button type="button" class="about-prototype-tab${active}" data-item-href="${item.href}">
            ${item.label}
          </button>
        `;
      })
      .join("");
  }

  function isEmptyBlock(node) {
    if (!node) {
      return false;
    }

    const text = (node.textContent || "").replace(/\u00a0/g, "").trim();
    return !text && !node.querySelector("img");
  }

  function isImageOnlyBlock(node) {
    if (!node) {
      return false;
    }

    const text = (node.textContent || "").replace(/\u00a0/g, "").trim();
    return Boolean(node.querySelector("img")) && text.length === 0;
  }

  function trimLeadingNodes(container) {
    const children = Array.from(container.children);
    let encounteredText = false;

    children.forEach((child) => {
      if (encounteredText) {
        return;
      }

      if (isEmptyBlock(child) || isImageOnlyBlock(child)) {
        child.remove();
        return;
      }

      const text = (child.textContent || "").replace(/\u00a0/g, " ").trim();
      if (text.length > 0) {
        encounteredText = true;
      }
    });
  }

  async function renderDocument(item) {
    const requestId = ++pendingRequestId;
    documentTarget.innerHTML = '<p class="about-prototype-document-loading">문서를 불러오는 중입니다.</p>';

    try {
      const response = await fetch(item.href);
      if (!response.ok) {
        throw new Error(`Failed to load ${item.href}`);
      }

      const html = await response.text();
      if (requestId !== pendingRequestId) {
        return;
      }

      const parsed = new DOMParser().parseFromString(html, "text/html");
      const source =
        parsed.querySelector(".contentBody #page > div") ||
        parsed.querySelector(".contentBody #page") ||
        parsed.querySelector(".contentBody");

      if (!source) {
        throw new Error(`Document content missing for ${item.href}`);
      }

      const clone = source.cloneNode(true);
      clone.querySelectorAll("script, style, select").forEach((node) => node.remove());
      trimLeadingNodes(clone);
      documentTarget.innerHTML = clone.innerHTML;
    } catch (error) {
      if (requestId !== pendingRequestId) {
        return;
      }

      documentTarget.innerHTML =
        '<p class="about-prototype-document-error">문서를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>';
    }
  }

  function renderPanel(group, item) {
    headingTarget.textContent = group.heading;
    panelIndexTarget.textContent = `${group.index} / ${item.meta}`;
    panelTitleTarget.textContent = group.id === "about3" ? item.meta : item.label;
    relatedTarget.innerHTML = group.items
      .filter((candidate) => candidate.href !== item.href)
      .slice(0, 5)
      .map(
        (candidate) =>
          `<li><a href="${candidate.href}" data-item-href="${candidate.href}">${candidate.label}</a></li>`
      )
      .join("");
    renderDocument(item);
  }

  function syncState(nextGroupId, nextItemHref) {
    state.groupId = nextGroupId;
    state.itemHref = nextItemHref;
    const group = getGroup();
    const item = getItem(group);
    state.groupId = group.id;
    state.itemHref = item.href;
    renderGroups();
    renderTabs(group);
    renderPanel(group, item);
  }

  root.addEventListener("click", (event) => {
    const groupButton = event.target.closest("[data-group-id]");
    if (groupButton) {
      const group = groups.find((candidate) => candidate.id === groupButton.dataset.groupId);
      if (group) {
        syncState(group.id, group.items[0].href);
      }
      return;
    }

    const tabButton = event.target.closest("[data-item-href]");
    if (tabButton) {
      event.preventDefault();
      syncState(state.groupId, tabButton.dataset.itemHref);
    }
  });

  syncState(state.groupId, state.itemHref);
})();
