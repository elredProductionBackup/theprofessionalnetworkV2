"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ *
 *  Charter content
 *  Transcribed from TPN_Charter.docx. Text is kept faithful to the
 *  source; only list markers / numbering are normalised for display.
 * ------------------------------------------------------------------ */

const CHARTER = [
  {
    num: "01",
    id: "preamble",
    title: "Preamble",
    blocks: [
      {
        sub: "1.1",
        body: [
          { p: `This Governing Charter ("Charter") establishes the foundational principles, governance framework, membership standards, and operational policies of The Professionals Network ("TPN"), a community of professional leaders committed to building ecosystems of global relevance through collaborative scale, conviction, and forward motion.` },
        ],
      },
      {
        sub: "1.2",
        body: [
          { p: `The TPN is established with the vision of bringing top academic and professional minds together to solve problems, generate ideas, and collaborate with intent, creating structured frameworks where insights turn into action and collective intelligence drives better decisions.` },
        ],
      },
    ],
  },
  {
    num: "02",
    id: "operating-philosophy",
    title: "Operating Philosophy",
    blocks: [
      {
        sub: "2.1",
        h: "Ecosystem over Individualism",
        body: [
          { p: `Global relevance is not achieved through isolated brilliance. It comes from building interconnected systems: talent, capital, supply chains, technology, and influence that reinforce each other. Every Member contributes to this architecture. The culture rewards collaborative scale, not personal wins.` },
        ],
      },
      {
        sub: "2.2",
        h: "Conviction in Scale",
        body: [
          { p: `Scale determines seriousness. TPN operates on the belief that ambition is only credible when it can compound across markets, sectors, and borders. Ideas are interrogated not for novelty but for capacity to scale, sustain, and dominate.` },
        ],
      },
      {
        sub: "2.3",
        h: "Restless Forward Motion",
        body: [
          { p: `A shared temperament: impatient with stagnation, allergic to incrementalism. Conversations are anchored in where the world is going, not where it has been. Curiosity, speed, and execution are cultural currencies.` },
        ],
      },
    ],
  },
  {
    num: "03",
    id: "purpose-identity",
    title: "Purpose & Identity",
    blocks: [
      {
        sub: "3.1",
        h: "Purpose",
        body: [
          { p: `The purpose of The TPN is to:` },
          {
            items: [
              { m: "(a)", t: `Create a curated peer-learning ecosystem where leaders build, grow, and take their ideas further;` },
              { m: "(b)", t: `Bring together top academic and professional minds to solve problems, generate ideas, and collaborate with intent;` },
              { m: "(c)", t: `Create structured frameworks where insights turn into action and collective intelligence drives better decisions;` },
              { m: "(d)", t: `Redefine how networks engage, learn, collaborate, and grow — using clarity, technology, and intent to deliver outcomes.` },
            ],
          },
        ],
      },
      {
        sub: "3.2",
        h: "The Ethos of The Professionals Network",
        body: [
          { p: `Curated peer learning and collaboration, focused on solving problems using the best learnings.` },
        ],
      },
      {
        sub: "3.3",
        h: "What The Professionals Network Is Not",
        body: [
          {
            items: [
              { m: "(a)", t: `The Professionals network is not just another networking organisation.` },
              { m: "(b)", t: `The Professionals network is not executive education. Anyone can organise executive education; it is the peer group that matters.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "04",
    id: "guiding-principles",
    title: "Guiding Principles",
    intro: `The following principles anchor how The Professionals Network operates and how its members engage with one another:`,
    blocks: [
      {
        sub: "4.1",
        h: "Peer-Led Excellence",
        body: [
          {
            items: [
              { m: "(a)", t: `Every Member enters the room as an equal, regardless of scale, sector, or stage, and engages with generosity and goodwill.` },
              { m: "(b)", t: `We lead with intellectual honesty and personal integrity in every interaction.` },
              { m: "(c)", t: `We recognise that each Member brings a complete identity, professional, intellectual, personal, and familial, and we invest in the whole person.` },
            ],
          },
        ],
      },
      {
        sub: "4.2",
        h: "Compounding Insight",
        body: [
          {
            items: [
              { m: "(a)", t: `We pursue relentless growth through first-principles thinking and structured learning.` },
              { m: "(b)", t: `We deliberately seek out contrarian viewpoints and unfamiliar disciplines through a membership that spans industries, geographies, and backgrounds.` },
              { m: "(c)", t: `We measure success by the tangible impact we generate in the ecosystems we build and serve.` },
            ],
          },
        ],
      },
      {
        sub: "4.3",
        h: "Trust and Confidential Engagement",
        body: [
          {
            items: [
              { m: "(a)", t: `Confidentiality is fundamental to participation. Unless expressly agreed otherwise, what is shared within The Professionals Network remains confidential.` },
              { m: "(b)", t: `Members engage with authenticity, openness, and respect, creating an environment where ideas, challenges, and experiences may be shared candidly and constructively.` },
              { m: "(c)", t: `Members prioritise substance over status, respect differing viewpoints, and contribute to an environment built on trust, discretion, and meaningful relationships.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "05",
    id: "core-values",
    title: "Core Values",
    intro: `The following Core Values define the standards of behaviour expected of every Member across all The Professionals network interactions. They are the cultural foundation upon which the ecosystem is built.`,
    blocks: [
      {
        sub: "5.1",
        h: "Open to Share",
        body: [
          {
            items: [
              { m: "(a)", t: `We approach every The Professionals network interaction with a spirit of contribution, sharing knowledge, experience, and networks without keeping score.` },
              { m: "(b)", t: `The ecosystem rewards those who invest in it. Every Member is expected to contribute actively, whether through ideas, introductions, or time, as part of their commitment to The Professionals Network.` },
              { m: "(c)", t: `When the community convenes, collective progress takes precedence over individual agendas.` },
            ],
          },
        ],
      },
      {
        sub: "5.2",
        h: "Respect",
        body: [
          {
            items: [
              { m: "(a)", t: `We act with integrity in our personal and professional life at all times and avoid behaviour that harms the reputation of other Members or of The Professionals, which includes abiding by applicable laws as a minimum threshold.` },
              { m: "(b)", t: `We treat one another with the highest respect and attention.` },
              { m: "(c)", t: `We hold our ethical standards above those outside our community, valuing relationships over any transaction. We proactively address disagreements in a respectful exchange, including accepting decisions with which we may disagree.` },
              { m: "(d)", t: `We encourage open contact between Members for learning and collaboration, but we do not solicit other Members unless clearly invited to do so. We use extra caution when using a Member's contact and personal information, and always respect when a Member says no.` },
            ],
          },
        ],
      },
      {
        sub: "5.3",
        h: "Inclusivity",
        body: [
          {
            items: [
              { m: "(a)", t: `We interact as equal peers and do not tolerate discrimination in any form.` },
              { m: "(b)", t: `We embrace diversity of thought as a key foundation of The Professionals network and seek a diverse membership base across cultures, industries, backgrounds, and perspectives.` },
              { m: "(c)", t: `We approach controversial topics with equanimity, are open to multiple perspectives, and engage in a positive learning environment, even if those perspectives differ from our own.` },
              { m: "(d)", t: `We respect our differences and do not tolerate harassment in any form. We foster an environment of belonging that is positive, safe, empathetic, and inclusive.` },
            ],
          },
        ],
      },
      {
        sub: "5.4",
        h: "Authenticity",
        body: [
          {
            items: [
              { m: "(a)", t: `We show up as our authentic selves and give others space to be vulnerable and open. Every authentic interaction encourages others to act similarly.` },
              { m: "(b)", t: `We listen humbly and seek to understand the other's experiences and perspectives without judgement.` },
              { m: "(c)", t: `We abide by absolute confidentiality in all closed-door sessions. Member information must be treated as confidential at all times; we do not provide Member contact information or personal information to a non-member for any reason.` },
              { m: "(d)", t: `We disclose known potential conflicts of interest in our interactions and always lean towards more disclosure, not intentionally omitting important facts to deceive others or putting our interests above those of The Professionals Network.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "06",
    id: "membership",
    title: "Membership",
    blocks: [
      {
        sub: "6.1",
        h: "Selection",
        body: [
          {
            items: [
              { m: "(a)", t: `The Professionals Network admits a selected number of individuals each year based on signal, trajectory, and contribution to the room.` },
              { m: "(b)", t: `There is no automatic renewal of membership year on year. This ensures only those who participate and contribute are part of the ecosystem.` },
              { m: "(c)", t: `Membership is by invitation or application, subject to review and approval by the Advisory Council.` },
            ],
          },
        ],
      },
      {
        sub: "6.2",
        h: "Eligibility Criteria",
        body: [
          { p: `Membership in The Professionals Network is open to individuals who demonstrate:` },
          {
            items: [
              { m: "(a)", t: `Leadership of a business or enterprise of significance;` },
              { m: "(b)", t: `A demonstrable track record of building, scaling, or investing at a meaningful level;` },
              { m: "(c)", t: `Intellectual curiosity, generosity of spirit, and a commitment to first-principles thinking;` },
              { m: "(d)", t: `Alignment with the Operating Philosophy and Core Values of The Professionals Network.` },
            ],
          },
          { p: `It is noted that individuals meeting the aforesaid categories are not guaranteed membership as the selection remains a discretionary practice.` },
        ],
      },
      {
        sub: "6.3",
        h: "Wider Perspective Members",
        body: [
          { p: `Beyond its core circle, The Professionals network may include a limited number of individuals of exceptional merit, from science, medicine, sport, and beyond, distinguished by their work, thinking, and lived experience, each carefully selected to bring uncommon depth to the room.` },
        ],
      },
      {
        sub: "6.4",
        h: "Annual Affirmation",
        body: [
          { p: `Every Member must affirm each year that they understand and commit to this Charter, the Community Standards, and the Core Values of The Professionals Network.` },
        ],
      },
      {
        sub: "6.5",
        h: "Membership Fees",
        body: [
          {
            items: [
              { m: "(a)", t: `Members shall pay such annual membership fees as may be determined by the Advisory Council from time to time.` },
              { m: "(b)", t: `Membership fees are exclusive of airfare, local transfers, and hotel accommodation, which shall be borne by the Member.` },
              { m: "(c)", t: `Failure to pay fees by the stipulated date may result in suspension or termination of membership.` },
            ],
          },
        ],
      },
      {
        sub: "6.6",
        h: "Member Obligations",
        body: [
          { p: `Each Member shall:` },
          {
            items: [
              { m: "(a)", t: `Participate actively in the programmes and sessions of The Professionals Network;` },
              { m: "(b)", t: `Contribute meaningfully to discussions and peer-learning activities;` },
              { m: "(c)", t: `Uphold the confidentiality, reputation, and standards of The Professionals Network;` },
              { m: "(d)", t: `Comply with this Charter and all policies of The Professionals Network.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "07",
    id: "governance",
    title: "Governance",
    blocks: [
      {
        sub: "7.1",
        h: "The Advisory Council",
        body: [
          {
            items: [
              { m: "(a)", t: `Saurabh Goswamy (the "Founder") shall serve as the Founder and Chairman of The Professionals Network and shall head the Advisory Council.` },
              { m: "(b)", t: `The Advisory Council shall set the vision, direction, and strategic priorities of The Professionals Network.` },
            ],
          },
        ],
      },
      {
        sub: "7.2",
        h: "Composition of the Advisory Council",
        body: [
          {
            items: [
              { m: "(a)", t: `The Advisory Council shall be the primary governing body of The Professionals Network, responsible for all strategic, policy, and operational oversight of the organisation. It shall consist of such a number of distinguished individuals, in consultation with existing members of the Advisory Council, deems appropriate.` },
              { m: "(b)", t: `The Advisory Council shall determine matters of membership selection, programme design, partnerships, community standards, and such other matters as fall within the scope of this Charter.` },
              { m: "(c)", t: `All members of the Advisory Council shall participate in deliberations on an equal footing, subject to the Founder's casting vote as provided in Section 7.3(b).` },
              { m: "(d)", t: `The appointment of any new member to the Advisory Council shall require the guidance of existing members of the Advisory Council, in addition to the endorsement of the Founder as head of the Advisory Council.` },
              { m: "(e)", t: `The Advisory Council shall serve as the designated body responsible for the review and adjudication of Member conduct violations reported under Section 8 of this Charter. The Advisory Council may investigate complaints, determine whether a breach has occurred, and impose such sanctions as it considers appropriate in accordance with Section 8.3.` },
            ],
          },
        ],
      },
      {
        sub: "7.3",
        h: "Decision-Making",
        body: [
          {
            items: [
              { m: "(a)", t: `Strategic and policy decisions relating to The Professionals Network, including matters of membership, programme direction, partnerships, and community standards, shall be determined by the Advisory Council by simple majority vote of its members present and voting. The Founder shall chair all such deliberations.` },
              { m: "(b)", t: `In the event of a tie vote on any matter before the Advisory Council, the Founder shall hold a casting vote to determine the outcome.` },
              { m: "(c)", t: `Day-to-day operational matters shall be managed by such a management team as the Advisory Council, on the recommendation of the Founder, may appoint.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "08",
    id: "code-of-conduct",
    title: "Code of Conduct & Enforcement",
    blocks: [
      {
        sub: "8.1",
        h: "Application",
        body: [
          { p: `This Code of Conduct applies to every Member and all those who interact in The Professionals community.` },
        ],
      },
      {
        sub: "8.2",
        h: "Potential Violations",
        body: [
          { p: `The following conduct is incompatible with membership in The Professionals Network. This list is illustrative and not exhaustive; The Professionals Network reserves the right to address conduct that undermines its values even where not expressly enumerated below:` },
          {
            items: [
              { m: "(a)", lead: "Unethical Conduct:", t: ` A Member shall be considered to have acted unethically where the Member: (i) faces formal criminal charges for a serious offence in any jurisdiction; (ii) has engaged in fraud, dishonesty, deceit, or conduct involving moral turpitude; (iii) has been involved in public disrepute or scandal that brings The Professionals Network or its Members into disrepute; or (iv) has provided materially false or misleading information in connection with their membership.` },
              { m: "(b)", lead: "Discrimination:", t: ` A Member shall be in breach of these standards where the Member excludes, marginalises, or restricts another Member's participation on the basis of race, ethnicity, nationality, religion, culture, gender, sexual orientation, age, disability, political belief, industry, or any other protected characteristic.` },
              { m: "(c)", lead: "Harassment:", t: ` A Member shall be in breach of these standards where the Member engages in unwelcome, threatening, violent, or degrading behaviour toward any person within the The Professionals community. This includes, without limitation: unwanted sexual advances or contact; sexually inappropriate remarks or conduct; racial, ethnic, or other discriminatory slurs; intimidation or threats; persistent unwanted communications; and conduct that systematically undermines another Member.` },
              { m: "(d)", lead: "Improper Solicitation:", t: ` The Professionals Network is designed to foster collaboration, and Members are encouraged to explore mutual opportunities in good faith. However, a Member shall be in breach of these standards where the Member uses another Member's contact details or personal information, without that Member's explicit consent, for any of the following purposes: (i) unsolicited marketing or selling of products or services; (ii) facilitating business introductions that have not been invited or welcomed; (iii) promoting political, charitable, or advocacy causes; (iv) recruiting or soliciting investment or employment opportunities without prior invitation; (v) seeking preferential deals, discounts, or access; or (vi) promoting external events or platforms without The Professionals Network approval. For the avoidance of doubt, genuine collaborative engagement between Members, such as exploring joint ventures, co-investment, or partnership opportunities, is not a violation of this provision, provided it is conducted with transparency and mutual consent.` },
              { m: "(e)", lead: "Breach of Confidentiality:", t: ` A Member shall be in breach of these standards where the Member, without express prior authorisation: (i) discloses or references information shared during any closed-door The Professionals session; (ii) shares, forwards, or otherwise disseminates Member information to persons outside The Professionals Network; or (iii) uses another Member's name, likeness, or personal information in any external communication, publicity, or social media without that Member's written consent.` },
              { m: "(f)", lead: "Conflict of Interest:", t: ` A Member shall be in breach of these standards where the Member: (i) prioritises personal gain over the interests of The Professionals Network in any The Professionals network context; (ii) accepts gifts, hospitality, or remuneration that could reasonably be perceived as influencing their conduct within the community; (iii) promotes or contracts services in which the Member holds a direct or indirect interest without prior transparent disclosure; or (iv) fails to declare competing interests openly and in good faith.` },
              { m: "(g)", lead: "Misrepresentation:", t: ` A Member shall be in breach of these standards where the Member misrepresents their professional status, qualifications, business performance, or other material facts, whether by affirmative misstatement or by failing to correct a known inaccuracy, thereby undermining the foundation of trust upon which The Professionals Network depends.` },
            ],
          },
        ],
      },
      {
        sub: "8.3",
        h: "Enforcement",
        body: [
          {
            items: [
              { m: "(a)", t: `Enforcement of this Charter is conducted by the Advisory Council, acting as the conduct review body of The Professionals Network.` },
              { m: "(b)", t: `The severity of any consequence shall be proportionate to the nature and circumstances of the violation. Sanctions may include formal warning, temporary suspension, or permanent expulsion from The Professionals Network. Where a Member has previously been subject to disciplinary action, subsequent violations will be treated with progressively less leniency.` },
              { m: "(c)", t: `The Advisory Council retains broad discretion in conduct matters and is not confined to the categories enumerated in this Charter. Decisions may be made on a case-by-case basis, guided by the overarching interests and reputation of The Professionals Network.` },
            ],
          },
        ],
      },
      {
        sub: "8.4",
        h: "Reporting Violations",
        body: [
          {
            items: [
              { m: "(a)", t: `Every Member bears a responsibility to uphold these standards and to raise concerns where they witness conduct that falls short of them.` },
              { m: "(b)", t: `All reports of potential violations shall be treated with strict confidentiality throughout any review process.` },
              { m: "(c)", t: `Violations may be reported to the Founder, as head of the Advisory Council, or to any other member of the Advisory Council via such channels as may be designated from time to time.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "09",
    id: "organisational-neutrality",
    title: "Organisational Neutrality",
    blocks: [
      {
        sub: "9.1",
        h: "Organisational Neutrality",
        body: [
          {
            items: [
              { m: "(a)", t: `The Professionals Network does not issue public statements, endorse candidates, or adopt institutional positions on matters of legislation, government policy, or social, political, or geopolitical affairs.` },
              { m: "(b)", t: `This stance reflects a deliberate design choice: the Network's value lies in convening leaders of sharply different perspectives. Institutional neutrality preserves the intellectual independence of Members and the integrity of the space in which they engage.` },
            ],
          },
        ],
      },
      {
        sub: "9.2",
        h: "Members' Individual Freedom",
        body: [
          {
            items: [
              { m: "(a)", t: `Individual Members retain full freedom to express personal views and to participate in political, charitable, or social action in their own capacities, provided they do not purport to represent The Professionals Network or act in contravention of these Community Standards.` },
              { m: "(b)", t: `The line between The Professionals as a platform for discourse and The Professionals as an advocate of positions is fundamental to the Network's identity and must be maintained at all times.` },
            ],
          },
        ],
      },
      {
        sub: "9.3",
        h: "Learning Boundaries",
        body: [
          {
            items: [
              { m: "(a)", t: `The Professionals network actively encourages exploration of complex, contested, and forward-looking issues. The critical distinction is between facilitating learning, insight, and legitimate collaboration (which The Professionals Network supports) and engaging in advocacy, partisan promotion, or unsolicited commercial solicitation on behalf of a cause or venture (which is not permitted within The Professionals sessions). Members exploring genuine business collaboration with one another, consistent with Section 3.3 of this Charter, are not in breach of these boundaries.` },
              { m: "(b)", t: `Sessions may feature speakers and discussions on provocative, charged, or divisive topics. The decision to host such content reflects the Network's commitment to intellectual rigour, it does not signify institutional endorsement of any position presented.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "10",
    id: "social-media",
    title: "Social Media Policy",
    blocks: [
      {
        sub: "10.1",
        h: "Scope",
        body: [
          { p: `This policy applies to content posted on external social media platforms (including LinkedIn, Instagram, X, YouTube, and others) by Members in connection with The Professionals Network.` },
        ],
      },
      {
        sub: "10.2",
        h: "Members Are Encouraged To:",
        body: [
          {
            items: [
              { m: "(a)", t: `Identify themselves as The Professionals Network Members in professional biographies, social media profiles, and public-facing platforms;` },
              { m: "(b)", t: `Share thoughtful reflections on their The Professionals Network experience, provided they observe the confidentiality obligations set out in this Charter;` },
              { m: "(c)", t: `Engage respectfully with Network-related content;` },
              { m: "(d)", t: `Exercise awareness that all online content is attributable, permanent, and may carry consequences beyond the platform on which it appears.` },
            ],
          },
        ],
      },
      {
        sub: "10.3",
        h: "Members Are Discouraged From:",
        body: [
          {
            items: [
              { m: "(a)", t: `Tagging, naming, or otherwise publicly identifying any Member without securing that Member's prior, express consent;` },
              { m: "(b)", t: `Publicly disclosing financial, legal, or operationally sensitive internal Network matters;` },
              { m: "(c)", t: `Leveraging The Professionals Network brand for personal commercial gain, solicitation, or self-promotion;` },
              { m: "(d)", t: `Associating The Professionals Network name with content unrelated to the Network's mission, including partisan political or religious advocacy;` },
              { m: "(e)", t: `Publishing or linking to content that is defamatory, indecent, or otherwise harmful to the Network's reputation.` },
            ],
          },
        ],
      },
      {
        sub: "10.4",
        h: "General Guidelines",
        body: [
          {
            items: [
              { m: "(a)", t: `The confidentiality obligations in this Charter extend fully to online activity. There is no temporal limit on the duty of confidence, it applies indefinitely.` },
              { m: "(c)", t: `Content posted online can have global reach. Members should consider whether material acceptable in one jurisdiction may cause offence or carry legal consequences in another.` },
              { m: "(d)", t: `Do not purport to speak on behalf of The Professionals Network unless specifically authorised by the Advisory Council.` },
            ],
          },
        ],
      },
      {
        sub: "10.5",
        h: "Enforcement",
        body: [
          { p: `Breach of this social media policy may trigger a conduct review under Section 8 of this Charter. Depending on the severity and frequency of the violation, consequences may range from a formal caution to suspension or termination of membership.` },
        ],
      },
    ],
  },
  {
    num: "11",
    id: "brand-ip",
    title: "Brand & Intellectual Property Guidelines",
    blocks: [
      {
        sub: "11.1",
        h: "Protection of The Professionals Brand",
        body: [
          { p: `The Professionals Network name, visual identity, and associated trademarks represent the collective reputation of the ecosystem. They embody the standards, selectivity, and ambition that define membership. Accordingly, the brand may only be deployed in furtherance of The Professionals Network's mission and in a manner consistent with these guidelines.` },
        ],
      },
      {
        sub: "11.2",
        h: "Permitted Uses",
        body: [
          {
            items: [
              { m: "(a)", t: `Members may identify themselves publicly as Members of The Professionals Network in professional contexts.` },
              { m: "(b)", t: `Members may reference The Professionals network brand in connection with officially sanctioned Network programmes, events, and activities.` },
            ],
          },
        ],
      },
      {
        sub: "11.3",
        h: "Uses Requiring Prior Approval",
        body: [
          {
            items: [
              { m: "(a)", t: `No Member may issue any public statement purporting to represent The Professionals Network without the express prior authority of the Advisory Council.` },
              { m: "(b)", t: `Where a group of Members collectively supports or promotes an activity, cause, or event, The Professionals network name and trademarks must not be used in connection with that activity unless prior written approval has been obtained from The Professionals Network.` },
            ],
          },
        ],
      },
    ],
  },
  {
    num: "12",
    id: "competition-antitrust",
    title: "Competition & Antitrust Compliance",
    blocks: [
      {
        sub: "12.1",
        h: "Commitment",
        body: [
          { p: `The Professionals Network operates with a firm commitment to full compliance with all applicable competition and antitrust legislation in every jurisdiction in which its Members conduct business, recognising that The Professionals Network operates, and intends to continue to expand, as a cross-border ecosystem. Nothing in this section constitutes legal advice; Members are encouraged to obtain independent legal counsel where necessary.` },
        ],
      },
      {
        sub: "12.2",
        h: "General Guidance",
        body: [
          {
            items: [
              { m: "(a)", t: `Members must exercise vigilance when discussing business matters with fellow Members, particularly where those Members operate in the same or adjacent industries.` },
              { m: "(b)", t: `Information that is not in the public domain, including but not limited to pricing (past, present, or future), bidding strategies, discount structures, terms of trade, customer or supplier selection, territorial allocation, and production volumes, must not be exchanged between Members.` },
              { m: "(c)", t: `Engagement in bribery of any form is strictly prohibited and is grounds for immediate expulsion.` },
            ],
          },
        ],
      },
      {
        sub: "12.3",
        h: "Members in the Same Industry",
        body: [
          { p: `Members who are actual or potential competitors face heightened regulatory risk when interacting within The Professionals Network. The following conduct is strictly prohibited and may constitute a criminal offence in many jurisdictions:` },
          {
            items: [
              { m: "(a)", t: `Using The Professionals Network as a forum to signal, coordinate, or influence industry pricing;` },
              { m: "(b)", t: `Entering into formal or informal arrangements to standardise commercial terms, restrict output, or harmonise business practices;` },
              { m: "(c)", t: `Imposing resale price requirements or territorial restrictions on distributors or suppliers;` },
              { m: "(d)", t: `Coordinated refusals to deal i.e. any arrangement between Members to collectively refuse to transact with a particular buyer, seller, or counterparty;` },
              { m: "(e)", t: `Bid rigging, market division, or any allocation of customers, territories, or contracts between competing Members.` },
            ],
          },
        ],
      },
      {
        sub: "12.4",
        h: "Communication Guidelines",
        body: [
          { p: `In all Network interactions, Members must refrain from the following:` },
          {
            items: [
              { m: "(a)", t: `Discussing or exchanging specific cost structures, pricing data, or the timing of price changes with competitors (noting that legitimate collaborative discussions between non-competing Members regarding joint ventures or co-investment opportunities are not prohibited by this provision);` },
              { m: "(b)", t: `Disclosing competitively sensitive intelligence regarding customers, consumer segments, or market positioning that is not publicly available;` },
              { m: "(c)", t: `Revealing non-public information about production capacity, output methods, or distribution arrangements;` },
              { m: "(d)", t: `Coordinating with competitors on price, output, distribution channels, or territorial strategy;` },
              { m: "(e)", t: `Sharing current operating data, forward-looking business plans, or strategic intentions;` },
              { m: "(f)", t: `Discussing individual market shares, geographic coverage, or territorial ambitions with competitors;` },
              { m: "(g)", t: `Revealing details of pending or prospective tenders, bids, or procurement processes;` },
              { m: "(h)", t: `Permitting or ignoring potentially anti-competitive discussion, any Member who witnesses a potential breach must immediately request that the conversation cease and report the matter to The Professionals Network.` },
            ],
          },
        ],
      },
      {
        sub: "12.5",
        body: [
          { p: `Members should note that anti-competitive arrangements need not be formalised in writing; tacit understandings, informal signals, and circumstantial coordination can each constitute a violation of applicable law. These guidelines govern all interactions occurring in any The Professionals Network context.` },
        ],
      },
    ],
  },
  {
    num: "13",
    id: "terms-waivers",
    title: "Terms, Waivers & Policies",
    blocks: [
      {
        sub: "13.1",
        h: "Assumption of Risk & Liability Waiver",
        body: [
          { p: `By registering for and attending any programme, gathering, or activity organised by The Professionals Network (each an "Event"), each attendee acknowledges and agrees as follows:` },
          {
            items: [
              { m: "(a)", t: `The attendee voluntarily accepts all risks inherent in participation, including those arising from travel, venue conditions, and interaction with other attendees;` },
              { m: "(b)", t: `The attendee releases and holds harmless The Professionals Network, its Founder, management team, affiliates, sponsors, and fellow Members from all liability for injury, loss, or damage sustained in connection with the Event, howsoever caused;` },
              { m: "(c)", t: `The attendee agrees to indemnify The Professionals Network and its representatives against any claims, demands, or proceedings brought by third parties arising from or connected with the attendee's participation.` },
            ],
          },
        ],
      },
      {
        sub: "13.2",
        h: "Disclaimer",
        body: [
          {
            items: [
              { m: "(a)", t: `Any information, insight, analysis, or opinion presented at an Event by speakers, educators, investors, or other contributors represents the views and responsibility of that individual alone. The Professionals Network does not curate, verify, or endorse such content.` },
              { m: "(b)", t: `The Network makes no representation or warranty regarding the accuracy, completeness, or commercial viability of any information, investment opportunity, or business proposition discussed at any Event.` },
              { m: "(c)", t: `Members are expected to exercise their own independent judgement and to seek professional advice before acting on any information or opportunity encountered through The Professionals Network.` },
            ],
          },
        ],
      },
      {
        sub: "13.3",
        h: "Programme Changes",
        body: [
          { p: `All elements of any Event, including schedule, activities, venues, and speakers, are subject to modification at the Network's discretion. The Network will use reasonable endeavours to notify attendees of material changes in advance.` },
        ],
      },
      {
        sub: "13.4",
        h: "Health & Safety",
        body: [
          { p: `Attendees are responsible for complying with all applicable health and safety requirements at Event venues. Participation in any Event activity is undertaken at the attendee's own risk.` },
        ],
      },
      {
        sub: "13.5",
        h: "Cancellation Policy",
        body: [
          {
            items: [
              { m: "(a)", t: `In the event that The Professionals Network cancels an Event, registration fees shall be refunded in accordance with a refund schedule to be determined and published by the Advisory Council for each Event. The Professionals Network does not guarantee a full refund in all circumstances of Network-initiated cancellation.` },
              { m: "(b)", t: `The Network is not responsible for refunding airfare, accommodation, or other incidental expenses in any circumstances. Members are advised to purchase travel/trip cancellation insurance.` },
              { m: "(c)", t: `Cancellation by a Member shall be subject to such cancellation schedules, administrative fees, and refund amounts as may be published by The Professionals Network for each Event.` },
              { m: "(e)", t: `Members cannot transfer their registration to another Member, unless confirmed in writing by The Professionals Network management team and any applicable transfer fee.` },
            ],
          },
        ],
      },
      {
        sub: "13.6",
        h: "Force Majeure",
        body: [
          { p: `The Professionals Network shall bear no liability for the cancellation, postponement, or curtailment of any Event where such failure is attributable to circumstances beyond the Network's reasonable control, including without limitation: natural disasters, armed conflict, civil unrest, industrial action, government restrictions, pandemics, or public health emergencies.` },
        ],
      },
      {
        sub: "13.7",
        h: "Exclusions",
        body: [
          { p: `Membership fees and event registration fees are exclusive of airfare, local transfers, and hotel accommodation, which shall be borne by the attendee.` },
        ],
      },
    ],
  },
  {
    num: "14",
    id: "confidentiality",
    title: "Confidentiality",
    blocks: [
      {
        sub: "14.1",
        h: "Absolute Confidentiality",
        body: [
          {
            items: [
              { m: "(a)", t: `All discussions, information, ideas, and materials shared within any The Professionals network session, including but not limited to workshops, immersive programmes, closed-door discussions, and field visits, are strictly confidential.` },
              { m: "(b)", t: `No information shared in The Professionals network session may be disclosed outside the session without the express consent of the Member who shared it.` },
            ],
          },
        ],
      },
      {
        sub: "14.2",
        h: "Member Information",
        body: [
          {
            items: [
              { m: "(a)", t: `All Member contact information, personal details, and professional information shared within The Professionals Network is confidential and must not be disseminated to non-members.` },
              { m: "(b)", t: `Members must not use another Member's name, image, or information in any publicity release or on social media without prior written consent.` },
            ],
          },
        ],
      },
      {
        sub: "14.3",
        h: "Duration",
        body: [
          { p: `Confidentiality obligations survive the termination or expiry of membership and have no statute of limitations.` },
        ],
      },
    ],
  },
  {
    num: "15",
    id: "amendments",
    title: "Amendments",
    blocks: [
      {
        sub: "15.1",
        body: [
          { p: `This Charter may be amended, modified, or supplemented at any time by the Advisory Council, on the recommendation of the Founder.` },
        ],
      },
      {
        sub: "15.2",
        body: [
          { p: `Amendments shall be communicated to all Members and shall take effect on the date specified in the notice of amendment.` },
        ],
      },
      {
        sub: "15.3",
        body: [
          { p: `This Charter shall be reviewed periodically by the Advisory Council to ensure it remains current and fit for purpose.` },
        ],
      },
    ],
  },
  {
    num: "16",
    id: "miscellaneous",
    title: "Miscellaneous",
    blocks: [
      {
        sub: "16.1",
        h: "Limitation of Liability",
        body: [
          { p: `To the fullest extent permitted by applicable law, The Professionals Network shall not be liable for any indirect, consequential, incidental, or special damages, including but not limited to loss of profits, loss of revenue, or loss of use, arising out of or in connection with membership or participation in any Event, regardless of the cause of action or the theory of liability (whether in contract, tort, statute, equity, or otherwise).` },
        ],
      },
      {
        sub: "16.2",
        h: "No Agency",
        body: [
          { p: `Membership in The Professionals Network does not create an agency, partnership, joint venture, or employment relationship between the Member and The Professionals Network. No Member is authorised to act as an agent of or bind The Professionals Network.` },
        ],
      },
      {
        sub: "16.3",
        h: "Governing Law",
        body: [
          { p: `This Charter shall be governed by and construed in accordance with the laws of India.` },
        ],
      },
      {
        sub: "16.4",
        h: "Dispute Resolution",
        body: [
          { p: `Any dispute arising out of or in connection with this Charter or membership in The Professionals Network shall be resolved by arbitration seated in Mumbai, India, in accordance with the Arbitration and Conciliation Act, 1996 (as amended). The arbitral tribunal shall consist of a sole arbitrator appointed by mutual consent of the parties, failing which by the Advisory Council.` },
        ],
      },
      {
        sub: "16.5",
        h: "Severability",
        body: [
          { p: `If any provision of this Charter is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.` },
        ],
      },
      {
        sub: "16.6",
        h: "Entire Agreement",
        body: [
          { p: `This Charter, together with any policies and guidelines issued from time to time, constitutes the entire agreement between The Professionals Network and its Members regarding the subject matter hereof.` },
        ],
      },
      {
        sub: "16.7",
        h: "Effective Date",
        body: [
          { p: `This Charter shall come into effect on 1st of July 2026 and shall remain in force until amended or superseded.` },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  Renderers
 * ------------------------------------------------------------------ */

const ClauseList = ({ items }) => (
  <ul className="mt-4 space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 md:gap-4">
        <span className="shrink-0 select-none font-inter-display text-[15px] md:text-[16px] leading-[170%] text-[#c01823] tabular-nums">
          {item.m}
        </span>
        <p className="text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c]">
          {item.lead && (
            <span className="font-semibold text-[#333336]">{item.lead}</span>
          )}
          {item.t}
        </p>
      </li>
    ))}
  </ul>
);

const Block = ({ block }) => {
  if (block.p) {
    return (
      <p className="text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c]">
        {block.p}
      </p>
    );
  }
  if (block.items) return <ClauseList items={block.items} />;
  return null;
};

const Subsection = ({ block }) => (
  <div className="mt-8 first:mt-6">
    <div className="flex items-baseline gap-3">
      <span className="shrink-0 font-inter-display text-[14px] md:text-[15px] font-medium text-[#8a8a91] tabular-nums pt-[2px]">
        {block.sub}
      </span>
      {block.h && (
        <h3 className="font-inter-display text-[18px] md:text-[20px] font-medium leading-[130%] tracking-[-0.6px] text-[#333336]">
          {block.h}
        </h3>
      )}
    </div>
    <div className={`${block.h ? "md:pl-[52px]" : "md:pl-[52px]"} space-y-4 mt-3`}>
      {block.body.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  </div>
);

const Section = ({ section, registerRef }) => (
  <section
    id={section.id}
    ref={(el) => registerRef(section.id, el)}
    className="scroll-mt-28 pt-16 md:pt-24 border-t border-[#E6E6E6] first:border-t-0 first:pt-0"
  >
    <div className="flex items-baseline gap-4 md:gap-6">
      <span className="font-inter-display text-[15px] md:text-[17px] font-medium text-[#c01823] tabular-nums leading-none pt-[6px]">
        {section.num}
      </span>
      <h2 className="font-inter-display text-[28px] md:text-[38px] font-medium leading-[112%] tracking-[-1.4px] text-[#1f1f22]">
        <span className="relative inline-block">
          {section.title.charAt(0)}
          <span className="absolute -bottom-[3px] left-0 w-[14px] h-[2px] bg-[#c01823]" />
        </span>
        {section.title.slice(1)}
      </h2>
    </div>

    {section.intro && (
      <p className="mt-6 md:ml-[44px] text-[15px] md:text-[16px] leading-[170%] tracking-[-0.1px] text-[#57575c] max-w-[68ch]">
        {section.intro}
      </p>
    )}

    <div className="mt-2 md:ml-[44px] max-w-[72ch]">
      {section.blocks.map((block, i) => (
        <Subsection key={i} block={block} />
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------ *
 *  Page
 * ------------------------------------------------------------------ */

export default function CharterPage() {
  const router = useRouter();
  const [active, setActive] = useState(CHARTER[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const refs = useRef({});

  const registerRef = (id, el) => {
    if (el) refs.current[id] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    const el = refs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  return (
    <main className="bg-white font-inter text-[#333336] min-h-screen pt-[30px] md:pt-[0px]">
      {/* Header */}
      <header className="border-b border-[#E6E6E6]">
        <div className="mx-auto max-w-[1240px] px-[24px] md:px-[40px] pt-[72px] pb-[40px] md:pt-[120px] md:pb-[64px]">
          {/* <button
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-2 font-inter-display text-[14px] md:text-[15px] text-[#8a8a91] hover:text-[#c01823] transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 12 20" fill="none" className="rotate-180">
              <path
                d="M0 20V16H4V20H0ZM4 16V12H8V16H4ZM8 12V8H12V12H8ZM4 8V4H8V8H4ZM0 4V0H4V4H0Z"
                fill="currentColor"
              />
            </svg>
            Back to Home
          </button> */}

          {/* <span className="block font-inter-display text-[15px] md:text-[17px] text-[#8a8a91] tracking-[-0.3px] mb-4">
            The Professionals Network
          </span> */}

          <h1 className="font-inter-display font-medium text-[44px] leading-[104%] tracking-[-2px] text-[#1f1f22] md:text-[76px] md:tracking-[-3.5px]">
            <span className="relative inline-block">
              Governing
              <span className="absolute -bottom-[2px] left-0 h-[3px] w-[64px] bg-[#c01823] md:w-[96px]" />
            </span>{" "}
            Charter
          </h1>

          <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-center md:gap-8 font-inter-display text-[15px] md:text-[16px] text-[#8a8a91] tracking-[-0.3px]">
            <span>Effective 1 July 2026</span>
            <span className="hidden md:inline text-[#E6E6E6]">|</span>
            <span>Governed by the laws of India</span>
            <span className="hidden md:inline text-[#E6E6E6]">|</span>
            <span>16 Sections</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[1240px] px-[24px] md:px-[40px]">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* TOC — desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-[96px] py-[64px]">
              <span className="block font-inter-display text-[13px] uppercase tracking-[1px] text-[#b3b3b8] mb-5">
                Contents
              </span>
              <ul className="space-y-[10px]">
                {CHARTER.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => goTo(s.id)}
                        className="group flex w-full items-baseline gap-3 text-left"
                      >
                        <span
                          className={`shrink-0 font-inter-display text-[12px] tabular-nums transition-colors ${
                            isActive ? "text-[#c01823]" : "text-[#c9c9ce]"
                          }`}
                        >
                          {s.num}
                        </span>
                        <span
                          className={`font-inter-display text-[14px] leading-[130%] tracking-[-0.2px] transition-colors ${
                            isActive
                              ? "text-[#c01823] font-medium"
                              : "text-[#8a8a91] group-hover:text-[#333336]"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* TOC — mobile */}
          {/* <div className="lg:hidden pt-6">
            <button
              onClick={() => setTocOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-none border border-[#E6E6E6] bg-[#FCFCFC] px-5 py-4 font-inter-display text-[15px] text-[#333336] "
            >
              <span>Jump to section</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="#c01823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {tocOpen && (
              <ul className="mt-2 border border-[#E6E6E6] divide-y divide-[#E6E6E6]">
                {CHARTER.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goTo(s.id)}
                      className="flex w-full items-baseline gap-3 px-5 py-3 text-left"
                    >
                      <span className="shrink-0 font-inter-display text-[12px] tabular-nums text-[#c9c9ce]">
                        {s.num}
                      </span>
                      <span className="font-inter-display text-[14px] text-[#57575c]">
                        {s.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          {/* Sections */}
          <div className="py-16 md:py-[96px] space-y-16 md:space-y-24">
            {CHARTER.map((section) => (
              <Section key={section.id} section={section} registerRef={registerRef} />
            ))}

            {/* Footnote */}
            <div className="border-t border-[#E6E6E6] pt-10">
              <p className="font-inter-display text-[14px] leading-[160%] text-[#8a8a91] max-w-[64ch]">
                This Charter is issued by The Professionals Network, a network trademarked
                and operated by Rextone Digital Pvt. Ltd. For questions relating to this
                Charter, contact{" "}
                <a
                  href="mailto:info@theprofessional.network"
                  className="text-[#c01823] underline underline-offset-2"
                >
                  info@theprofessional.network
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}