function scheduleHtmlParser(class_tables_string) {
  function getSections(start, end) {
    let sections = []
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      sections.push(i)
    }
    return sections
  }

  function getDay(rowIndex, cellIndex) {
    let day = 0
    if (rowIndex === 1 || rowIndex === 7 || rowIndex === 11) {
      day = cellIndex - 1
    }
    else{
      day = cellIndex
    }
    return day
  }

  const class_tables_array = class_tables_string.split('/new_week/')
  const courseInfos = []
  
  class_tables_array.forEach((tableString, weekIndex) => {
    let $ = cheerio.load(tableString, {decodeEntities: false })
    $('table').each((index, table) => {
        $(table).find('tr').each((rowIndex, row) => {
          $(row).find('td').each((cellIndex, cell) => {
             let cellText = $(cell).text().trim()
             if (cellText.includes('||')) {
              // 去掉多余的空白字符
              cellText = cellText.replace(/\s+/g, ' ').trim()
              // 使用正则表达式提取课程信息
              const courseInfoRegex = /(.+?) \|\| \((.+?)\)周 第(\d+)节 -- 第(\d+)节 (.+?) (.+)/
              const match = cellText.match(courseInfoRegex)
              if (match) {
                const courseName = match[1].trim()
                // const weeks = match[2].trim()
                const startPeriod = match[3].trim()
                const endPeriod = match[4].trim()
                const teacherName = match[5].trim()
                const classroomId = match[6].trim()
                let day = getDay(rowIndex, cellIndex)
                let sections = getSections(startPeriod, endPeriod)

                let courseInfo = courseInfos.find(info => info.name === courseName && info.day === day && JSON.stringify(info.sections) === JSON.stringify(sections))
        
                if (courseInfo) {
                  // 如果存在，更新周数
                  courseInfo.weeks.push(weekIndex + 1)
                } else {
                  // 如果不存在，创建新的记录
                  const courseTemp = {
                    name: courseName,
                    teacher: teacherName,
                    position: classroomId,
                    weeks: [weekIndex + 1],
                    day: day,
                    sections: sections,
                  }
                  courseInfos.push(courseTemp)
                }
              }
            }
            })
          })
        })
      })

  return courseInfos
}