let arr = `Software Engineer
Senior Software Engineer
Software Developer
Sr. Software Engineer / Developer / Programmer
Team Leader, IT
Test / Quality Assurance (QA) Engineer (Computer Software)
SAP Consultant
Data Scientist
Web Developer
Information Technology (IT) Consultant
Software Engineer / Developer / Programmer
Network Engineer
Technical Consultant
Business Analyst, IT
Java Developer
Lead Software Engineer
Associate Software Engineer
Information Technology (IT) Manager
Technical Architect
Systems Engineer, IT
Android Software Developer
Front End Developer / Engineer
Development Operations (DevOps) Engineer
Project Manager, Information Technology (IT)
Technical Support Engineer
PHP Developer
Senior Technical Consultant
Quality Assurance (QA) Engineer
Solutions Architect
Senior Systems Engineer
iOS Developer
Software Test Lead
.NET Software Developer / Programmer
Senior Project Manager, IT
Application Developer
Project Leader, IT
UI Developer
Programmer Analyst
Full Stack Software Developer
Principal Software Engineer
Systems Administrator
Software Architect
Database Administrator (DBA)
System Administrator, Computer / Network
Systems Engineer (Computer Networking / IT)
Data Engineer
Technical Project Manager
Software Development Engineer (SDE)
Business Intelligence (BI) Developer
Technology Analyst
Linux System Administrator
Operations Analyst
Module Lead
Systems Analyst
Product Manager, Software
Information Technology (IT) Director
Oracle Database Administrator (DBA)
Senior Java Developer
System Administrator, Windows Server
Test Analyst
Embedded Software Engineer
SAP Basis Administrator
Vice President (VP), Information Technology (IT)
Information Technology Specialist
Senior Database Administrator (DBA)
Technical Support Specialist
Senior Systems Analyst
Program Manager, IT
SAP ABAP Programmer
SQL Developer
Business Intelligence (BI) Analyst
Software Engineering Manager
Quality Assurance (QA) / Test Automation Engineer
Information Technology (IT) Lead
Sr. Network Engineer
Junior Software Engineer
SAS Programmer
Search Engine Optimization (SEO) Analyst
Senior Web Developer
Lead Software Development Engineer (SDE)
Web Designer & Developer
Test Manager
Software Development Manager
Network Administrator
Test / Quality Assurance (QA) Analyst, (Computer Software)
Senior Software Architect
Senior Software Development Engineer (SDE)
Senior Programmer Analyst
ScrumMaster
Project Manager, Software Development
Product Owner
Senior Systems Administrator
PHP Web Developer
Software Development Engineer, Test (SDET)
Senior Systems Engineer (Computer Networking / IT)
Process Analyst
Application Support Analyst
Security Consultant, (Computing / Networking / Information Technology)
Senior Technical Support Engineer
Java Software Developer / Programmer`;

var map = require('lodash/map');
var uniq = require('lodash/uniq');
arr = arr.split("\n");

var uniqArr = uniq(arr);

const availableRoles = map(uniqArr,(obj,index) => ({
    label: obj,
    value: obj,
    key: index
})); 
module.exports = availableRoles;