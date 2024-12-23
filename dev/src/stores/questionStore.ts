import { defineStore } from "pinia";

const useQuestionStore = defineStore("questionnaire", () => {
  const questions1 = [
    {
      indicator: "Adequate access to quality healthcare",
      questions:
        "To what extent do general healthcare services operate within capacity at all times and provide adequate and affordable healthcare to all?",
      "score 0":
        "There are no mechanisms in place to ensure that general healthcare services across the city are affordable for all. Some population groups find it hard to access affordable healthcare. Staff shortages are very common within general healthcare services across the city and there are severe shortages of skilled and motivated healthcare practitioners within the city. There is no spare capacity, and no mechanisms in place to draft in additional resources, to cope with surges in demand (e.g., during an epidemic or extreme weather conditions), and there is typically a significant negative impact on the health outcomes of patients seeking treatment from healthcare services at these time.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "General healthcare services are accessible for all and there are mechanisms in place to ensure it is affordable for all. No population groups find it hard to access affordable healthcare. Staff shortages are rare within general healthcare services across the city and there are adequate resources of qualified, skilled, motivated healthcare practitioners within the city. There are mechanisms in place to ensure that the system is able to cope with surges in demand (e.g., during an epidemic or extreme weather conditions) and there is typically no significant negative impact on the health outcomes of patients seeking treatment from healthcare services at these times.",
    },
    {
      indicator: "Adequate access to quality healthcare",
      questions:
        "To what extent is effective maternal care and family planning available and affordable to all?",
      "score 0":
        "Maternal care, family planning education, facilities and resources are severely under-funded and are not readily available or are unaffordable to many within the city. Minority and vulnerable groups are frequently unable to access these services.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Maternal care, family planning education, facilities and resources are well-funded, widely available and free at the point of service. Specific initiatives to reach minority and vulnerable groups are in place. Good level of professional healthcare and support provided to mother and baby during and after pregnancy.",
    },
    {
      indicator: "Adequate access to quality healthcare",
      questions:
        "To what extent are healthcare services for non-communicable diseases (NCDs) available and affordable to all?",
      "score 0":
        "There is a lack of quality facilities and personnel to NCDs. Resources are stretched and people are not getting access to appropriate and affordable treatment in a timely fashion. There is a lack of specialist treatment within the city for key NCDs such as cancer, cardiovascular issues, respiratory issues, diabetes, kidney problems etc.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There are quality, well-funded facilities and personnel to manage NCD cases within the city. People receive timely, affordable and quality treatment. Specialist units, facilities and experts exist for specific NCDs such as cancer, cardiovascular issues, respiratory issues, diabetes, kidney problems etc.",
    },
    {
      indicator: "Adequate access to quality healthcare",
      questions:
        "To what extent are mental healthcare services affordable and accessible to all?",
      "score 0":
        "Mental health services are severely under-resourced within the city and are unable to meet demand for these services. There is a severe shortage of health and psychological support available for: • Victims of crime and violence • Immigrants • Addiction patients The city’s emergency planning does not consider a surge in demand for mental health support post-shock.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There are free mental health services available within the city and they are accessible to all. There is sufficient health and psychological support available for: • Victims of crime and violence • Immigrants • Addiction patients Additionally, the city’s emergency planning has considered a surge in demand for mental health support post-shock.",
    },
    {
      indicator: "Emergency medical care",
      questions:
        "To what extent are emergency medical services adequately resourced to deal with major events?",
      "score 0":
        "There are very few emergency medical facilities across the city. These are not effectively distributed spatially. There are not enough emergency physicians (surgeons, doctors) and nurses to deal with surges in causalities from major incidents. There are no agreements with neighbouring hospitals to accept certain casualties in a major incident.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There is a good distribution of well-resourced emergency medical facilities across the city meaning all citizens are within appropriate proximity of a hospital. There are enough emergency physicians and nurses to deal with surges in causalities from major incidents. There are sufficient specialist skills / training within this pool of staff to deal with specialist emergency cases (e.g., burns, pandemic cases) and appropriate medical equipment and facilities. There are formal arrangements between networks of hospitals and health organisations (including NGOs) to help manage surge incidents.",
    },
    {
      indicator: "Emergency medical care",
      questions:
        "To what extent are emergency medical services adequately prepared to deal with major events?",
      "score 0":
        "Emergency planning within the healthcare system to deal with major events is non-existent or severely limited. There is no city-wide plan for co-ordinating medical resources following a major event. Roles and responsibilities for dealing with a major event have not been defined. Disaster preparedness drills are rarely, if ever, undertaken at the individual facility level or the city-wide level.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There is effective, integrated emergency planning within the healthcare system to deal with major events. All emergency medical facilities have business continuity plans in place and plans for dealing with major disasters. A city-wide plan exists for co-ordinating medical resources following a major event and roles and responsibilities are clearly defined within this. Disaster preparedness drills are routinely undertaken at the individual facility level (at least annually) and the city-wide level (at least every 3 years).",
    },
    {
      indicator: "Effective emergency response services",
      questions:
        "To what extent are the ambulance service adequately trained and resourced to effectively respond to call-outs?",
      "score 0":
        "Paramedics / ambulance services operate below maximum capacity at all times and are able to respond to 100% of day-to-day call-outs. There are always sufficient paramedics to respond to incidents relating to health (ambulance). There is a robust call-out system to receive and process public emergency calls. Paramedics / emergency health responders have adequate capacity and/or arrangements to manage surges in the number of incidents. They are well trained, equipped and regulated. They are also prepared and equipped to deal with specific large scale emergencies that the city may face (e.g., earthquakes, terrorism etc.) ensuring that those effected can be located and assisted.",
      "score 1": "",
      "score 2": "",
      "score 3":
        "There are no ambulance response services operating within the city or there is a severe capacity deficit in the city's everyday emergency response capability. This leaves it unable to effectively manage (everyday) health callouts. Paramedics / emergency health responders are not trained, equipped, generally prepared to respond to major incidents which may require specific expertise (e.g., earthquakes, terrorism etc.)., terrorism etc.).",
    },
    {
      indicator: "Effective emergency response services",
      questions:
        "To what extent are the fire services adequately trained and resourced to effectively respond to call-outs?",
      "score 0":
        "There are no fire response services operating within the city or there is a severe capacity deficit in the city's everyday emergency response capability. This leaves it unable to effectively manage (everyday) fire incidents. Firefighters are not trained, equipped, generally prepared to respond to major incidents which may require specific expertise (e.g., earthquakes, terrorism etc.).",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Fire response services operate below maximum capacity at all times and are able to respond to 100% of day-to-day call-outs. There are always sufficient firefighters to respond to fire incidents. There is a robust call out system to receive and process public emergency calls. Firefighters have surplus capacity and/or arrangements to manage surges in the number of incidents. They are well trained, equipped and regulated. They are also prepared and equipped to deal with specific large scale emergencies that the city may face (e.g., earthquakes, terrorism etc.) ensuring that those effected can be located and assisted.",
    },
    {
      indicator: "Effective emergency response services",
      questions:
        "To what extent are police adequately trained and resourced to effectively respond to call-outs?",
      "score 0":
        "There are no police response services operating within the city or there is a severe capacity deficit in the city's everyday emergency response capability. This leaves it unable to effectively manage (everyday) incidents relating to law and order (police response). Police are not trained, equipped, generally prepared to respond to major incidents which may require specific expertise (e.g., earthquakes, terrorism etc.).",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Police response services operate below maximum capacity at all times and are able to respond to 100% of day-to-day call-outs. There are always sufficient police to respond to incidents relating to law and order (e.g., police). There is a robust call-out system to receive and process public emergency calls. Police have surplus capacity and/or arrangements to manage surges in the number of incidents. They are well trained, equipped and regulated. They are also prepared and equipped to deal with specific large scale emergencies that the city may face (e.g., earthquakes, terrorism etc.) ensuring that those effected can be located and assisted.",
    },
    {
      indicator: "Effective emergency response services",
      questions:
        "To what extent is there an adequately trained, resourced and coordinated official emergency response to manage major incidents and the immediate aftermath of disasters?",
      "score 0":
        "There is no emergency response and search and rescue capacity within the city and none available for deployment within the city from regional or national sources if required. It is unable to provide immediate response to major incidents / emergencies.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Emergency responders (police, fire, ambulance etc.) are trained, equipped and coordinated to manage major incidents (e.g., earthquakes, terrorism etc.). Search and Rescue capability exists with robust strategic arrangements to utilise assets such as the military, NGOs or other trained volunteers as appropriate, Response teams are equipped to meet the needs of all high risk disaster scenarios. This includes any specialist equipment and training (e.g., response to hazardous materials). The city has undertaken a detailed inventory of the full set of response assets both within the city's direct control as well as assets outside its control (i.e. controlled by the private sector or other government body). The inventory is based on accurate, up-to-date data. Mechanisms are in place to regularly review and update the inventory. Responders receive regular training in disaster management/ search and rescue (at least once per year).",
    },
    {
      indicator: "Effective emergency response services",
      questions:
        "To what extent does city have mechanisms in place to mobilise critical non-financial resources (people, equipment) for providing emergency response and staple goods for subsequent relief (i.e. food and basic necessities) after a disaster event?",
      "score 0":
        "There are no city-wide emergency plans in place that incorporate planning for emergency resource accessibility. No mechanism to mobilise critical non-financial resources. The city has not undertaken an inventory of assets. OR The city has undertaken an inventory, but the inventory was incomplete (i.e., did not include assets outside of direct city control) or is out of date. No mechanism to establish agreements to utilise critical assets / supplies that are not within direct city controls during times of need.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There are city-wide mechanisms in place that address emergency resource accessibility. The city has undertaken a detailed inventory of the full set of relief assets both within the city's direct control as well as assets outside its control (i.e. controlled by the private sector or other government body). The inventory is based on accurate, up-to-date data. Mechanisms are in place to regularly review and update the inventory. This includes emergency relief (food, shelter, water etc.). It addresses logistics including use of distribution teams and vehicles to manage demand. Responders and volunteers are all effectively trained and coordinated to ensure the immediate needs of those affected by a disaster can be met. Resource preparation / planning reflects the worst-case scenario potential of the city's risk profile.",
    },
    {
      indicator: "disaster management authority have sufficient staffing capacity",
      questions:
        "Does the responsible disaster management authority have sufficient staffing capacity to support first responder duties in surge event scenario? ",
      "score 0": "No surge capacity identified.",
      "score 1": "Coverage of all neighbourhoods within 48-72 hours.",
      "score 2": "Coverage of all neighbourhoods within 24-48 hours.",
      "score 3":
        "Surge capacity exists and is tested either via actual events or practice drills for disaster and risk scenarios for current and foreseen risks coverage of all neighbourhoods will be possible within 4 hours.",
    },
    {
      indicator: "early warning system and reaching level",
      questions:
        "Length and reliability of warning - enabling practical action to be taken.",
      "score 0": "Less than half of the population is reachable by early warning system.",
      "score 1":
        "Estimated that more than half of the population is reachable by early warning system.",
      "score 2":
        "Estimated that over 75% of the population is reachable by early warning system.",
      "score 3":
        "Estimated that over 90% of the population is reachable by early warning system.",
    },
    {
      indicator:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.;",
      questions:
        "To the best of your knowledge, are there enough water storage facilities which are safe in case of an emergency?",
      "score 0":
        "There are almost no safe water storage facilities in case of an emergency",
      "score 1": "There are few safe water storage facilities in the city",
      "score 2":
        "There are some water storage facilities that provide the majority of the population with drinking water and that are safe in case of an emergency",
      "score 3":
        "Yes, there are enough water storage facilities to withstand the period of a flood or drought, and they are safely located (e.g. elevated, withstanding strong storms, etc.)",
    },
    {
      indicator:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.;",
      questions:
        "To the best of your knowledge, are existing drainage and sanitation facilities (e.g. drainage channels, latrines, toilets, wastewater management facilities, sewerage system) adequately designed to withstand heavy rains or flooding?",
      "score 0":
        "There are almost no drainage and sanitation facilities designed for such a purpose in the city",
      "score 1":
        "There are few neighbourhoods of the city that are equipped with such drainage and sanitation facilities, but they cannot withstand heavy rains or flooding",
      "score 2":
        "There are some neighbourhoods of the city that are equipped with such drainage and sanitation facilities, and they work reasonably well in case of heavy rains or flooding",
      "score 3":
        "Yes, most of the city is equipped with drainage and sanitation facilities that were designed for such a purpose, and they work well in case of heavy rains or flooding",
    },
    {
      indicator:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.;",
      questions:
        "Are there tax collection mechanisms in place in your city to finance basic service delivery (e.g. water, sanitation, solid waste management) and drainage/road maintenance?",
      "score 0":
        "There are no effective tax collection mechanisms in place for this purpose in the city",
      "score 1":
        "There are tax collection mechanisms in place, but these only enable basic service delivery and drainage/road maintenance in one or two neighbourhoods of the city",
      "score 2":
        "There are tax collection mechanisms in place which enable basic service delivery and drainage/road maintenance in some parts of the city",
      "score 3":
        "Yes, there are effective tax collection mechanisms in place to adequately finance basic service delivery and drainage/road maintenance in most parts of the city",
    },
    {
      indicator:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      questions:
        "does the city administration or other planning agencies developed, released, and updated a city baseline map or maps for the following topics: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, or other topics of similar nature and relevance?",
      "score 0":
        "None of the topics have been gathered in a map format nor contain the latest (current) status",
      "score 1": "Partially, only some topics are available and up to date",
      "score 2":
        "Yes, mostly up dated but not integrated; some topics are missing or not available, or not up-to-date",
      "score 3": "Yes, for all of them and are regularly updated",
    },
    {
      indicator: "Housing destroyed and damaged",
      questions:
        "Is there an updated and contrasted register of damaged housing stock (public and privately owned)?",
      "score 0":
        "No such activites have been carried-away or there are no updates, no quality of information is not reliable",
      "score 1": "<50% registered, updated and confirmed",
      "score 2": ">50% registered, updated and confirmed",
      "score 3": "100% registered, updated and confirmed",
    },
    {
      indicator: "critical infrastructure: mapping, planning and protection strategies",
      questions: "critical infrastructure: mapping, planning and protection strategies",
      "score 0":
        "There are no plans or forums. Critical infrastructure risks are not well understood in the city.",
      "score 1":
        "Risks are understood for some but not all of the major infrastructure types.",
      "score 2":
        "There is a critical infrastructure forum or other means to establish a shared understanding of risks between the city and various utility providers upon the points of stress on the system / risks at the city scale?",
      "score 3":
        "The city owns and implements (in collaboration with other stakeholders) a critical infrastructure plan or strategy to protect its critical infrastructure, utilities and services. The strategy highlights risks / stresses and includes continuity plans for essential services.",
    },
    {
      indicator:
        "% of education structures at risk of damage from “most probable” and “most severe” scenarios ",
      questions:
        "% of education structures at risk of damage from “most probable” and “most severe” scenarios ",
      "score 0": ">15% of teaching facilities at risk in “most probable” scenario.",
      "score 1": "5-10% of teaching facilities at risk in “most probable” scenario.",
      "score 2": "No teaching facilities at risk in “most probable” scenario.",
      "score 3": "No teaching facilities at risk in “most severe” scenario.",
    },
    {
      indicator: "Safe and affordable housing",
      questions:
        "To what extent does the city have an adequate supply of safe and affordable housing?",
      "score 0":
        "There is an acute shortage of affordable housing in the city. People lack security of tenure and property rights are not acceptable. There are large parts of the city where informal (unplanned) settlements have established unsuitable to live in.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "The city's supply of affordable housing is able to meet demand. This housing meets the requirements of residents (in terms of space and quality). There is an effective funding model to provide safe housing to the poor. There are incentives and affordable financing mechanisms available within the city to help upgrade the standard of existing housing stock so that it is better able to cope with predicted stresses and hazards. Land and property rights and rental regulation provide city residents with security. Programmes exist to legitimise informal settlements, in support of some of the city's poorest citizens.",
    },
    {
      indicator: "Safe and affordable housing",
      questions: "To what extent is the city's housing stock safe to live in?",
      "score 0":
        "There is a lack of housing standards and regulation. Specific building codes do not exist and construction / upgrade advice to owners and renters is non-existent. Some disaster-prone areas within the city have a high residential population. There are large parts of the city where a significant proportion of residential dwellings are likely to be poorly constructed. Tenure of land in many parts of the city is unclear.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "The city's housing stock is controlled by well-designed and enforced codes, standards and regulations. Residential development in disaster-prone areas has been avoided and the city's residential neighbourhoods are located in areas where exposure to hazards is low. Information / training / support is provided to owners and renters giving advice on construction and repairs, including things to check and signs of damage, due to shock events or longer term structural stresses. Information is continually reviewed, updated and incorporated into city housing.",
    },
    {
      indicator: "Safe and affordable housing",
      questions:
        "To what extent are there mechanisms in place for effective planning for emergency shelter and temporary housing",
      "score 0":
        "There are no mechanisms in place for effective planning for emergency shelter and temporary housing.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There is an emergency housing plan for the city for times of emergency and/or housing is a consideration within the Major Incident Plans for the city. Plans exist which appropriately consider the need for shelter at various stages of a disaster including immediate short-term shelter and medium-long-term replacement housing. Plans consider not just the accommodation but also the facilities and staff required for these premises to be run effectively. The Housing Plan is a considered, well-transitioned process able to meet the potential impact of local hazards and subsequent demand from the city population.",
    },
    {
      indicator: "Inclusive access to safe drinking water",
      questions:
        "To what extent is there a safe, reliable and affordable distribution of potable water to households across the city?",
      "score 0":
        "The majority of households in extensive areas of the city are not connected to a reliably safe potable water supply. No water quality standards exist. No regulatory body exists to enforce water quality standards.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "All households in all parts of the city are connected to a well-regulated potable water supply with safety procedures in place to ensure stringent quality standards are met at all times.",
    },
    {
      indicator: "Inclusive access to safe drinking water",
      questions:
        "To what extent is there effective planning for alternative (back-up) water supplies?",
      "score 0":
        "No mechanism for planning alternative water supplies. No plans in place for back-up supplies.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There are contingency plans for the city that identify how potable water will be distributed in case of a major event or extreme disruption. Well developed mechanisms are in place to provide back-up water supplies to residents, particularly including vulnerable populations, during emergencies. Plans based on accurate, up-to-date data. Mechanisms in place to regularly review and update planning.",
    },
    {
      indicator: "Effective sanitation",
      questions:
        "To what extent is there currently safe, reliable and affordable sanitation provided to all areas of the city",
      "score 0":
        "The majority of households in extensive areas have no access to sanitation. Failure of existing sanitation infrastructure is common. No standards for sanitation exist. No regulatory body exists to oversee enforcement of sanitation regulations and standards.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "All households in all parts of the city are connected to reliably safe sewage network (i.e. not septic tanks) with safety procedures in place to prevent failures. Sanitation regulations and standards exist and are stringently enforced, with non-compliance occurring very rarely.",
    },
    {
      indicator: "Effective sanitation",
      questions:
        "To what extent is there an emergency plan in the event that the sanitation system is disrupted and/or there is a surge in wastewater requiring treatment",
      "score 0":
        "There are no plans in place to maintain adequate levels of sanitation in the event that there is a major disruption to the sanitation network or a surge in wastewater requiring treatment.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Robust contingency arrangements / plans exist outlining actions and responsibilities, including alternative sanitation arrangements. Actions are communicated to citizens. Planning ensures overall sanitation system can manage disruption.",
    },
    {
      indicator: "Sufficient affordable food supply",
      questions:
        "To what extent are adequate and nutritious food supplies affordable for all households?",
      "score 0":
        "It is increasingly difficult for households to access good quality food at affordable prices. Prices of basic food commodities have been subject to large fluctuations in recent years and have become less affordable. The price of the city's main food staples is highly dependent on economic or political variables and there has been significant fluctuation in cost of these commodities in recent years.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "The city has a secure, nutritious food supply that is little influenced by economic or political variables. There has been little/no fluctuation in the price of basic food commodities over the recent years. All households are able to access good quality, nutritious food at affordable prices. The city has implemented initiatives to increase production of food within city boundaries",
    },
    {
      indicator: "Sufficient affordable food supply",
      questions:
        "To what extent are there adequate and nutritious food supplies that are geographically accessible to households?",
      "score 0":
        "Many households have very limited or no access to outlets that provide adequate, fresh and nutritious foods (e.g. because there is an absence of markets or supermarkets in certain neighbourhoods).",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "Initiatives have been implemented to assess the extent to which good quality, nutritious food is physically accessible to households across the city. The city has no neighbourhoods that could be described as 'food deserts' (i.e. no reasonable access to markets, supermarkets or other retail outlets that sell fresh, nutritious food at reasonable prices). All households have good access to outlets that sell adequate, fresh and nutritious foods at reasonable prices.",
    },
    {
      indicator: "Sufficient affordable food supply",
      questions:
        "To what extent are there mechanisms in place to ensure continuity of essential food supplies in an emergency and during times of stress (e.g., imports from major source of supply are disrupted / stopped)",
      "score 0":
        "There are no contingency plans for the city that identify how essential food supplies will be secured in case of a major event or extreme disruption. There are no initiatives or plans to increase security of supply of important foodstuffs.",
      "score 1": "20 - 40% level of service (incl. Quality)",
      "score 2": "40 - 60% level of service (incl. Quality)",
      "score 3":
        "There are contingency plans for the city that identify how essential food supplies will be secured for households in case of a major event or extreme disruption. Plans based on accurate, up-to-date data. Mechanisms in place to regularly review and update planning. There are effective initiatives and plans in place to increase security of supply of important foodstuffs.",
    },
    {
      indicator:
        "public education towards awareness of hazard, risk and disaster information",
      questions:
        "Do health and education facilities in the city have enough qualified personnel?",
      "score 0":
        "Most of the health and education facilities do not have enough qualified personnel",
      "score 1": "Few health and education facilities have enough qualified personnel",
      "score 2":
        "The majority of health and education facilities have enough qualified personnel",
      "score 3":
        "Yes, all health and education facilities have enough qualified personnel",
    },
    {
      indicator:
        "public education towards awareness of hazard, risk and disaster information",
      questions:
        "Are health and education facilities designed according to the principles of adaptive architecture, and as such adequately built and prepared to withstand the impacts of natural hazards?",
      "score 0":
        "There is almost no consideration of the principles of adaptive architecture in the design of these facilities",
      "score 1":
        "Few of them are designed according to principles of adaptive architecture",
      "score 2":
        "Most of them are designed according to principles of adaptive architecture",
      "score 3":
        "Yes, all of them are designed according to principles of adaptive architecture",
    },
    {
      indicator:
        "public education towards awareness of hazard, risk and disaster information",
      questions:
        "Are health and education facilities strategically used as safe havens in case of a natural hazards?",
      "score 0":
        "There is still no strategy in place for using these facilities as safe havens in case of a natural hazard",
      "score 1": "Very few facilities are used as safe havens ",
      "score 2":
        "Some of these facilities are used as safe havens, but there is room for improvement",
      "score 3":
        "Yes, these facilities are used as safe havens in case of a natural hazard, as part of existing disaster risk management strategies",
    },
    {
      indicator:
        "public education towards awareness of hazard, risk and disaster information",
      questions:
        "Do you think health and education facilities are organized to ensure continuity of their services in case of a disaster?",
      "score 0": "There are still no mechanisms in place to that effect in the city",
      "score 1":
        "There are very few facilities which would be able to continue functioning in case of a disaster",
      "score 2":
        "There are some mechanisms in place to that effect, but they do not always work effectively in case of a disaster",
      "score 3":
        "Yes, there are contingency mechanisms in place which effectively ensure the continuity of their functions in case of a disaster",
    },
    {
      indicator:
        "public education towards awareness of hazard, risk and disaster information",
      questions:
        "Does a co-ordinated public relations and education campaign exist, with structured messaging and channels to ensure hazard, risk and disaster information (that can be understood and used) is properly disseminated to the public? ",
      "score 0":
        "Systems for disseminating critical information on disaster risk are wholly inadequate.",
      "score 1":
        "Some useful programmes / channels exist for disseminating hazard, risk and disaster information, but there is significant room for improvement to reach a greater proportion of the public. 25% of the city population is reached.",
      "score 2":
        "Campaigns and programmes (PR and education) exist to ensure proper dissemination of hazard, risk and disaster information. Key messages reach over 50% of the city population.",
      "score 3":
        "Fully co-ordinated campaigns and programmes (PR and education) exist to ensure proper dissemination of hazard, risk and disaster information. Key messages reach over 75% of the city population.",
    },
    {
      indicator:
        "grassroots or community organizations participating in pre-event planning and post event response",
      questions:
        "Are grassroots or community organizations participating in pre-event planning and post event response for each neighbourhood in the city? ",
      "score 0":
        "There is very little involvement from grassroots organizations in the city.",
      "score 1":
        "There is awareness amongst key grassroots organizations of the importance of Disaster Risk Reduction, they support with awareness raising but not with active participation around response or planning.",
      "score 2":
        "There is involvement in diverse grassroots organizations, either in some locations, or in some aspect of the planning or response, but it is it not comprehensive.",
      "score 3":
        "Community organizations that cover a significant proportion of the city’s population are actively participating in pre-event planning and post-event response right across the city.",
    },
    {
      indicator:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      questions:
        "Are there training courses covering risk and resilience issues offered to all sectors of the city including government, business, NGOs and community?",
      "score 0": "Little or no relevant training exists that is tailored for the city.",
      "score 1":
        "Some training modules are available. Coverage and content needs to be significantly improved.",
      "score 2":
        "The city has a track record of delivering resilience training to some sectors, but other sectors lack training and engagement.",
      "score 3":
        "There are training courses covering risk, resilience and disaster response offered across all sectors of the city including government, business, NGO's and community?",
    },
    {
      indicator: "awareness of equipment and supply needed + provision",
      questions:
        "Will there be sufficient first responder equipment, with military or civilian back up as required?",
      "score 0":
        "Significant gaps in ability to meet needs even under “most likely” scenario.",
      "score 1":
        "Assets will meet basic needs under “most severe” scenario, but gaps are known to exist.",
      "score 2":
        "Equipment levels and assets have either been modelled or proven to be adequate in practice to deal with a “most severe” scenario, although this relies on mutual aid arrangements. Mutual aid agreements are tested for likelihood of being affected by the same disaster.",
      "score 3":
        "Equipment levels and assets have either been modelled or proven to be adequate in practice to deal with a “most severe” scenario.",
    },
    {
      indicator: "businesses with a documented business continuity plan",
      questions:
        "What proportion of businesses have a documented business continuity plan that has been reviewed within the last 18 months?",
      "score 0": "Under 20%.",
      "score 1": "20 - 40% businesses.",
      "score 2": "40 - 60% businesses.",
      "score 3": "60 - 100% businesses.",
    },
    {
      indicator: "Knowledge to funding opportunities (for local economy and recovery)",
      questions:
        "The city / lead agencies understand all sources of funding, and the “resilience dividends”, are well connected, understand all available routes to attract external funding and are actively pursuing funds for major resilience investments.",
      "score 0":
        "There is little understanding / awareness of available sources of funding for DRR.",
      "score 1":
        "There is some visibility of routes of funding, but picture is incomplete and little is done to pursue these funds.",
      "score 2":
        "The city is aware of numerous routes to secure funding for DRR activities and is actively pursuing a range of these.",
      "score 3":
        "The city understands all routes to secure funding for DRR activities, is actively pursuing a range of these and has had some success.",
    },
    {
      indicator: "Financial plan and budget for resilience, including contingency funds",
      questions:
        "Does the city have in place a specific 'ring fenced' (protected) budget, the necessary resources and contingency fund arrangements for local disaster risk reduction (mitigation, prevention, response and recovery)?",
      "score 0": "No clear plan.",
      "score 1":
        "There are some plans in different agencies / organizations but they are not co-ordinated.",
      "score 2":
        "The city financial plan allows for DRR activities, budgets are ring fenced.",
      "score 3":
        "The city financial plan is comprehensive in relation to DRR, budgets are ring fenced and contingency plans are in place.",
    },
  ];
  const questions = {};
});
