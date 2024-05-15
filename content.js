function addButton() {
  const dialog = document.querySelector('div[role="dialog"]');

  if (dialog && !document.getElementById("shift-button")) {
    const startTimeSpan = dialog.querySelector('span[data-key="startTime"]');
    const tabPanel = dialog.querySelector(
      'div[role="tabpanel"][aria-labelledby="tabEvent"]'
    );
    if (startTimeSpan) {
      const button = document.createElement("button");
      button.id = "shift-button";
      button.innerText = "5分ずらす";
      button.className = "custom-shift-button";

      button.addEventListener("click", function () {
        let currentTime = startTimeSpan.innerText.trim();
        console.log("Current time:", currentTime);

        let timeParts = currentTime.match(/(午前|午後)(\d+):(\d+)/);
        if (timeParts) {
          let period = timeParts[1];
          let hours = parseInt(timeParts[2]);
          let minutes = parseInt(timeParts[3]);

          console.log("Parsed time:", hours, minutes, period);

          if (period === "午後" && hours < 12) {
            hours += 12;
          }

          minutes += 5;
          if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
          }

          if (hours >= 24) {
            hours -= 24;
          }

          let newHours = hours.toString().padStart(2, "0");
          let newMinutes = minutes.toString().padStart(2, "0");
          let newPeriod = hours >= 12 ? "午後" : "午前";
          let newDisplayHours = hours > 12 ? hours - 12 : hours;
          let newTime = `${newPeriod}${newDisplayHours}:${newMinutes}`;
          console.log("New time:", newTime);

          const listboxElement = dialog.querySelector(
            '[role="listbox"][aria-label="開始時間"]'
          );

          if (listboxElement) {
            const baseId = listboxElement.id;
            const newId = `${baseId}T${newHours}${newMinutes}00`;

            const newTimeOption = document.createElement("div");
            newTimeOption.className = "VKy0Ic";
            newTimeOption.role = "option";
            newTimeOption.tabIndex = -1;
            newTimeOption.dataset.ical = `T${newHours}${newMinutes}00`;
            newTimeOption.innerText = newTime;
            newTimeOption.setAttribute(
              "jsaction",
              "mouseenter:vSTZcb; click:KjsqPd"
            );
            newTimeOption.id = newId;
            newTimeOption.addEventListener("click", function () {
              startTimeSpan.innerText = newTime;
            });

            const dropdownMenu = dialog.querySelector(
              'div[role="listbox"][aria-label="開始時間"]'
            );
            if (dropdownMenu) {
              dropdownMenu.appendChild(newTimeOption);
              console.log(
                "New time option added to dropdown menu:",
                newTimeOption
              );
              newTimeOption.click();
            } else {
              console.log("Dropdown menu not found");
            }
          } else {
            console.error(
              "指定されたroleとaria-labelを持つ要素が見つかりません。"
            );
          }
        } else {
          console.log("Time parts not matched");
        }
      });

      const parentElement = tabPanel.closest("div");
      if (parentElement) {
        parentElement.appendChild(button);
        console.log("Button added to the form:", button);
      }
    } else {
      console.log("Start time span not found");
    }
  }
}

window.addEventListener("load", function () {
  setTimeout(addButton, 2000);
});

const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true, subtree: true });
