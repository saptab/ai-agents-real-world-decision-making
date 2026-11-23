---
layout: assignments
title: Assignments
permalink: /assignments/
---

Fall 2026 submissions are due by **11:59 p.m. Eastern** on the dates below. Classwork, pitches, and presentations take place during class.

{% assign events = site.events | sort: "date" %}
## Submission deadlines

<table>
  <thead><tr><th scope="col">Due date</th><th scope="col">Deliverable</th></tr></thead>
  <tbody>
  {% for event in events %}
    {% if event.type == "due" %}
    <tr><td>{{ event.date | date: "%b %-d" }}</td><td>{{ event.description | escape }}</td></tr>
    {% endif %}
  {% endfor %}
  </tbody>
</table>

**Research progress updates.** For each of the five updates, submit a one- to two-page report describing your progress and identifying individual and joint work.

**Midterm pitch.** The syllabus calls for a one-page report to accompany the presentation. It also lists the October abstract and November slides in the deadlines above.

**Final project.** Include visualizations in the presentation slides. Write the eight-page report in single-column LaTeX using the [course style file](https://drive.google.com/file/d/1nEb6n5z49fTlBe9nu2Lhgm7TYhjZoGnk/view?usp=sharing). Place references after the eight pages and additional diagrams in an appendix. Link to your documented, appropriately licensed open-source code in the report.

## In-class work and presentations

<table>
  <thead><tr><th scope="col">Class date</th><th scope="col">Activity</th></tr></thead>
  <tbody>
  {% for event in events %}
    {% if event.name == "Classwork" or event.name == "In-class exam" or event.name == "Final presentations" %}
    <tr><td>{{ event.date | date: "%b %-d" }}</td><td>{{ event.description | escape }}</td></tr>
    {% endif %}
  {% endfor %}
  </tbody>
</table>

See the [syllabus]({{ '/syllabus/' | relative_url }}) for grading and the late policy.
