---
layout: page
title: Syllabus
permalink: /syllabus/
---

<style>
/* Add borders to tables in the syllabus page */
.syllabus-table, .syllabus-table th, .syllabus-table td {
  border: 1px solid #444;
  border-collapse: collapse;
}
.syllabus-table th, .syllabus-table td {
  padding: 6px 10px;
}
</style>


{% capture syllabus_content %}
{% include_relative static_files/syllabus_markdown.md %}
{% endcapture %}
<div class="markdown-body">
{{ syllabus_content | markdownify | replace: '<table>', '<table class="syllabus-table">' }}
</div>