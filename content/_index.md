---
title: Home
type: landing

sections:
  # ---- HERO ----
  - block: hero
    id: hero
    content:
      title: "Taewan Yoon, CFA"
      text: |-
        **Columbia MBA/MS** | Enterprise AI | Financial Services

        I sit where frontier AI meets enterprise finance — translating what the best models can do into strategies that financial institutions can actually deploy. From hands-on system architecture to go-to-market execution, I bridge the gap between AI platforms and the organizations that need to adopt them.
      cta:
        label: View Projects
        url: '#projects'
      cta_alt:
        label: Read My Writing
        url: '#posts'
    design:
      background:
        color: 'rgb(20, 22, 34)'
        text_color_light: true
      spacing:
        padding: ["80px", "0", "80px", "0"]

  # ---- ABOUT ----
  - block: about.avatar
    id: about
    content:
      username: admin
    design:
      spacing:
        padding: ["40px", "0", "40px", "0"]

  # ---- PROJECTS ----
  - block: collection
    id: projects
    content:
      title: Projects
      subtitle: AI systems built for enterprise deployment, not just demonstration
      text: ""
      count: 4
      filters:
        folders:
          - project
      sort_by: Date
      sort_ascending: false
    design:
      view: card
      columns: "1"
      spacing:
        padding: ["40px", "0", "40px", "0"]

  # ---- POSTS ----
  - block: collection
    id: posts
    content:
      title: "Writing"
      subtitle: Enterprise AI strategy for technical leaders and business decision-makers
      text: ""
      count: 3
      filters:
        folders:
          - post
      sort_by: Date
      sort_ascending: false
      archive:
        enable: true
        text: "See all posts"
    design:
      view: compact
      columns: "2"
      spacing:
        padding: ["40px", "0", "40px", "0"]

  # ---- EVENTS ----
  - block: collection
    id: events
    content:
      title: Events
      subtitle: ""
      text: ""
      count: 5
      filters:
        folders:
          - event
      sort_by: Date
      sort_ascending: false
      archive:
        enable: true
        text: "See all events"
    design:
      view: list
      columns: "1"
      spacing:
        padding: ["40px", "0", "40px", "0"]

  # ---- CONTACT ----
  - block: contact
    id: contact
    content:
      title: Contact
      text: |-
        Selectively pursuing enterprise AI roles — solutions architecture, product strategy, and go-to-market — where deep financial services expertise and hands-on AI deployment experience create measurable business value.
      email: contact@twyoon.com
      contact_links:
        - icon: linkedin
          icon_pack: fab
          name: LinkedIn
          link: https://linkedin.com/in/taewan-yoon
        - icon: github
          icon_pack: fab
          name: GitHub
          link: https://github.com/tyoon10
    design:
      columns: "2"
      spacing:
        padding: ["40px", "0", "40px", "0"]
---
