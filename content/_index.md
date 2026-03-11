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
        **Columbia MBA/MS** | Enterprise AI | Financial Technology

        The intersection of frontier AI and enterprise finance is still being defined — I'm drawn to that. I translate what the best models can do into strategies that institutions can actually deploy, and I'm always working to understand both sides more deeply.
      cta:
        label: Read My Writing
        url: '#posts'
      cta_alt:
        label: View Projects
        url: '#projects'
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

  # ---- POSTS ----
  - block: collection
    id: posts
    content:
      title: "Writing"
      subtitle: "Thinking through AI — systems, products, and the questions worth asking"
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

  # ---- PROJECTS ----
  - block: collection
    id: projects
    content:
      title: Projects
      subtitle: ""
      text: ""
      count: 2
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
        Selectively pursuing enterprise AI roles — solutions architecture, product strategy, and go-to-market — where deep FinTech expertise and hands-on AI deployment experience create measurable business value.
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
