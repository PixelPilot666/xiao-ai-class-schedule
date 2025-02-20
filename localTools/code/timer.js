/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
} = {}) {
  let weeks_num = document.getElementsByTagName("select")["zc"].length
  return {
    totalWeek: weeks_num,
    startSemester: '',
    startWithSunday: false,
    showWeekend: true,
    forenoon: 6,
    afternoon: 4,
    night: 4,
    sections: [
      {
        section: 1,
        startTime: '08:00',
        endTime: '08:45',
      },
      {
        section: 2,
        startTime: '08:55',
        endTime: '09:40',
      },
      {
        section: 3,
        startTime: '10:00',
        endTime: '10:45',
      },
      {
        section: 4,
        startTime: '10:55',
        endTime: '11:40',
      },
      {
        section: 5,
        startTime: '12:00',
        endTime: '12:45',
      },
      {
        section: 6,
        startTime: '12:55',
        endTime: '13:40',
      },
      {
        section: 7,
        startTime: '14:00',
        endTime: '14:45',
      },
      {
        section: 8,
        startTime: '14:55',
        endTime: '15:40',
      },
      {
        section: 9,
        startTime: '16:00',
        endTime: '16:45',
      },
      {
        section: 10,
        startTime: '16:55',
        endTime: '17:40',
      },
      {
        section: 11,
        startTime: '18:30',
        endTime: '19:15',
      },
      {
        section: 12,
        startTime: '19:25',
        endTime: '20:10',
      },
      {
        section: 13,
        startTime: '20:20',
        endTime: '21:05',
      },
      {
        section: 14,
        startTime: '21:15',
        endTime: '22:00',
      },
    ],
  }
}