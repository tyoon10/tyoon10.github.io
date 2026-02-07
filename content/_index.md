---
title: Home
type: landing

sections:
  # ---- HERO ----
  - block: hero
    id: hero
    content:
      title: "Taewan Yoon"
      text: |-
        **Columbia MBA/MS** | Enterprise AI | Financial Services

        Bridging AI platforms and financial institutions. Building go-to-market strategies and AI products where LLMs meet enterprise finance.
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
      subtitle: End-to-end builds, not slide decks
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
      subtitle: Enterprise AI strategy and technical decision-making
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

  # ---- CONTACT ----
  - block: contact
    id: contact
    content:
      title: Contact
      text: |-
        Open to enterprise AI strategy roles, particularly at the intersection of LLM platforms and financial services.
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
