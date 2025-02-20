async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {//函数名不要动
  await loadTool('AIScheduleTools')

  if (location.href.search('grkcb.htm') == -1) {
    await AIScheduleAlert('请去我的课表进行导入。')
    return 'do not continue'
  }

  await AIScheduleAlert('开始导入，请耐心等待。')

  let class_tables = []
  let weeks_num = dom.getElementsByTagName("select")["zc"].length
  
  let zc = dom.getElementsByTagName("select")["zc"].value
  let xj = dom.getElementsByTagName("select")["xj"].value
  let xn = dom.getElementsByTagName("select")["xn"].value

  let origin_url = location.href;
  const urlPattern = /^https:\/\/yjs\.nankai\.edu\.cn\/py\/page\/student\/grkcb\.htm$/;
  if (urlPattern.test(origin_url)) {
    origin_url += `?zc=${zc}&xj=${xj}&xn=${xn}`;
  }

  for (let i = 1; i <= weeks_num; i++) {
    let url = origin_url.replace(/zc=\d+/,`zc=${i}`)
    let response = await fetch(url)
    let text = await response.text()
    let parser = new DOMParser()
    let doc = parser.parseFromString(text, 'text/html')
    let tables = doc.getElementsByTagName("table")
    let class_table = tables[tables.length - 2]
    class_tables.push(class_table.outerHTML)
  }
  let class_tables_string = class_tables.join('/new_week/')

  return class_tables_string
 }
