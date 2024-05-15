function addButton() {
  const dialog = document.querySelector('div[role="dialog"]');

  if (dialog && !document.getElementById("shift-button")) {
    const startTimeSpan = dialog.querySelector('span[data-key="startTime"]');
    const endTimeSpan = dialog.querySelector('span[data-key="endTime"]');
    const tabPanel = dialog.querySelector(
      'div[role="tabpanel"][aria-labelledby="tabEvent"]'
    );

    if (startTimeSpan && endTimeSpan) {
      const button = document.createElement("button");
      button.id = "shift-button";
      button.innerText = "5分ずらす";
      button.className = "custom-shift-button";

      button.addEventListener("click", function () {
        let currentTime = startTimeSpan.innerText.trim();
        let endTime = endTimeSpan.innerText.trim();

        let timeParts = currentTime.match(/(午前|午後)(\d+):(\d+)/);
        let endTimeParts = endTime.match(/(午前|午後)(\d+):(\d+)/);

        if (timeParts && endTimeParts) {
          let period = timeParts[1];
          let hours = parseInt(timeParts[2]);
          let minutes = parseInt(timeParts[3]);

          let endPeriod = endTimeParts[1];
          let endHours = parseInt(endTimeParts[2]);
          let endMinutes = parseInt(endTimeParts[3]);

          if (period === "午後" && hours < 12) {
            hours += 12;
          }

          if (endPeriod === "午後" && endHours < 12) {
            endHours += 12;
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

            const dropdownMenu = dialog.querySelector(
              'div[role="listbox"][aria-label="開始時間"]'
            );

            if (dropdownMenu) {
              dropdownMenu.appendChild(newTimeOption);
              const dropdownButton = dialog.querySelector(
                'input[role="combobox"][aria-label="開始時間"]'
              );
              if (dropdownButton) {
                dropdownButton.click();
                setTimeout(() => {
                  newTimeOption.click();
                  setTimeout(() => {
                    const endDropdownButton = dialog.querySelector(
                      'input[role="combobox"][aria-label="終了時間"]'
                    );
                    if (endDropdownButton) {
                      endDropdownButton.click();
                      let originalEndHours = endHours
                        .toString()
                        .padStart(2, "0");
                      let originalEndMinutes = endMinutes
                        .toString()
                        .padStart(2, "0");
                      let originalEndPeriod = endHours >= 12 ? "午後" : "午前";
                      let originalEndDisplayHours =
                        endHours > 12 ? endHours - 12 : endHours;
                      let originalEndTime = `${originalEndPeriod}${originalEndDisplayHours}:${originalEndMinutes}`;

                      const endListboxElement = dialog.querySelector(
                        '[role="listbox"][aria-label="終了時間"]'
                      );

                      if (endListboxElement) {
                        const endBaseId = endListboxElement.id;
                        const originalEndId = `${endBaseId}T${originalEndHours}${originalEndMinutes}00`;

                        const originalEndTimeOption =
                          document.createElement("div");
                        originalEndTimeOption.className = "VKy0Ic";
                        originalEndTimeOption.role = "option";
                        originalEndTimeOption.tabIndex = -1;
                        originalEndTimeOption.dataset.ical = `T${originalEndHours}${originalEndMinutes}00`;
                        originalEndTimeOption.innerText = originalEndTime;
                        originalEndTimeOption.setAttribute(
                          "jsaction",
                          "mouseenter:vSTZcb; click:KjsqPd"
                        );
                        originalEndTimeOption.id = originalEndId;

                        const endDropdownMenu = dialog.querySelector(
                          'div[role="listbox"][aria-label="終了時間"]'
                        );

                        if (endDropdownMenu) {
                          endDropdownMenu.appendChild(originalEndTimeOption);
                          setTimeout(() => {
                            originalEndTimeOption.click();
                          }, 50);
                        }
                      }
                    }
                  }, 50);
                }, 50);
              }
            }
          }
        }
      });

      const parentElement = tabPanel.closest("div");
      if (parentElement) {
        parentElement.appendChild(button);
      }
    }
  }
}

window.addEventListener("load", function () {
  setTimeout(addButton, 2000);
});

const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true, subtree: true });
