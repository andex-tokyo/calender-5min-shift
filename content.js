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

      // ページの言語設定を判定する
      const lang = document.documentElement.lang || navigator.language;

      if (lang.startsWith("ja")) {
        button.innerText = "5分ずらす";
      } else {
        button.innerText = "Shift 5min";
      }

      button.className = "custom-shift-button";

      button.addEventListener("click", function () {
        let currentTime = startTimeSpan.innerText.trim();
        let endTime = endTimeSpan.innerText.trim();
        console.log("Current time:", currentTime);
        console.log("End time:", endTime);

        function parseTime(timeString) {
          let match = timeString.match(
            /(午前|午後)?\s*(\d{1,2}):(\d{2})([APap][Mm])?/
          );
          if (match) {
            let period = match[1] || match[4];
            let hours = parseInt(match[2]);
            let minutes = parseInt(match[3]);

            if (period === "午後" || period === "PM" || period === "pm") {
              if (hours < 12) {
                hours += 12;
              }
            } else if (
              period === "午前" ||
              period === "AM" ||
              period === "am"
            ) {
              if (hours === 12) {
                hours = 0;
              }
            }

            return { hours, minutes };
          }
          return null;
        }

        let startTime = parseTime(currentTime);
        let endTimeObj = parseTime(endTime);

        if (startTime && endTimeObj) {
          startTime.minutes += 5;
          if (startTime.minutes >= 60) {
            startTime.hours += 1;
            startTime.minutes -= 60;
          }

          if (startTime.hours >= 24) {
            startTime.hours -= 24;
          }

          let newHours = startTime.hours.toString().padStart(2, "0");
          let newMinutes = startTime.minutes.toString().padStart(2, "0");

          let newTime24 = `${newHours}:${newMinutes}`;
          let newTimeJP =
            startTime.hours >= 12
              ? `午後${startTime.hours % 12 || 12}:${newMinutes}`
              : `午前${startTime.hours}:${newMinutes}`;
          let newTimeEN =
            startTime.hours >= 12
              ? `${startTime.hours % 12 || 12}:${newMinutes}PM`
              : `${startTime.hours}:${newMinutes}AM`;

          console.log("New time (24-hour):", newTime24);
          console.log("New time (JP):", newTimeJP);
          console.log("New time (EN):", newTimeEN);

          const listboxElement = dialog.querySelector(
            '[role="listbox"][aria-label="開始時間"], [role="listbox"][aria-label="Start time"]'
          );

          if (listboxElement) {
            const baseId = listboxElement.id;
            const newId = `${baseId}T${newHours}${newMinutes}00`;

            const newTimeOption = document.createElement("div");
            newTimeOption.className = "VKy0Ic";
            newTimeOption.role = "option";
            newTimeOption.tabIndex = -1;
            newTimeOption.dataset.ical = `T${newHours}${newMinutes}00`;
            newTimeOption.innerText = newTimeJP; // 日本語表記に変更可能
            newTimeOption.setAttribute(
              "jsaction",
              "mouseenter:vSTZcb; click:KjsqPd"
            );
            newTimeOption.id = newId;
            newTimeOption.addEventListener("click", function () {
              console.log("New time option clicked:", newTimeJP);
            });

            const dropdownMenu = dialog.querySelector(
              'div[role="listbox"][aria-label="開始時間"], div[role="listbox"][aria-label="Start time"]'
            );

            if (dropdownMenu) {
              dropdownMenu.appendChild(newTimeOption);
              console.log(
                "New time option added to dropdown menu:",
                newTimeOption
              );

              const dropdownButton = dialog.querySelector(
                'input[role="combobox"][aria-label="開始時間"], input[role="combobox"][aria-label="Start time"]'
              );
              if (dropdownButton) {
                dropdownButton.click();
                setTimeout(() => {
                  newTimeOption.click();

                  setTimeout(() => {
                    const endDropdownButton = dialog.querySelector(
                      'input[role="combobox"][aria-label="終了時間"], input[role="combobox"][aria-label="End time"]'
                    );
                    if (endDropdownButton) {
                      endDropdownButton.click();

                      let originalEndHours = endTimeObj.hours
                        .toString()
                        .padStart(2, "0");
                      let originalEndMinutes = endTimeObj.minutes
                        .toString()
                        .padStart(2, "0");
                      let originalEndTimeJP =
                        endTimeObj.hours >= 12
                          ? `午後${
                              endTimeObj.hours % 12 || 12
                            }:${originalEndMinutes}`
                          : `午前${endTimeObj.hours}:${originalEndMinutes}`;

                      const endListboxElement = dialog.querySelector(
                        '[role="listbox"][aria-label="終了時間"], [role="listbox"][aria-label="End time"]'
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
                        originalEndTimeOption.innerText = originalEndTimeJP;
                        originalEndTimeOption.setAttribute(
                          "jsaction",
                          "mouseenter:vSTZcb; click:KjsqPd"
                        );
                        originalEndTimeOption.id = originalEndId;
                        originalEndTimeOption.addEventListener(
                          "click",
                          function () {
                            console.log(
                              "Original end time option clicked:",
                              originalEndTimeJP
                            );
                          }
                        );

                        const endDropdownMenu = dialog.querySelector(
                          'div[role="listbox"][aria-label="終了時間"], div[role="listbox"][aria-label="End time"]'
                        );

                        if (endDropdownMenu) {
                          endDropdownMenu.appendChild(originalEndTimeOption);
                          console.log(
                            "Original end time option added to dropdown menu:",
                            originalEndTimeOption
                          );

                          setTimeout(() => {
                            originalEndTimeOption.click();
                          }, 100);
                        } else {
                          console.log("End dropdown menu not found");
                        }
                      } else {
                        console.error(
                          "指定されたroleとaria-labelを持つ終了時間の要素が見つかりません。"
                        );
                      }
                    } else {
                      console.log("End dropdown button not found");
                    }
                  }, 100);
                }, 100);
              } else {
                console.log("Dropdown button not found");
              }
            } else {
              console.log("Dropdown menu not found");
            }
          } else {
            console.error(
              "指定されたroleとaria-labelを持つ開始時間の要素が見つかりません。"
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
      console.log("Start time or end time span not found");
    }
  }
}

window.addEventListener("load", function () {
  setTimeout(addButton, 2000);
});

const observer = new MutationObserver(addButton);
observer.observe(document.body, { childList: true, subtree: true });
