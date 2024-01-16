# YouNiversity README.md
The project is called YouNiversity; a portmanteau of you and university. Prospective students around the world experience barriers when embarking on the journey of finding the right university for them. These barriers range from prospective students experiencing anxiety to zero-motivation and are compounded by university websites not being centralised. A centralised universities website will break-down some of these barriers experienced by prospective students. YouNiversity is a minimum-viable-product that takes a user’s input of a country or city and then displays the names of all the universities in that country or city as clickable links to their websites. Users of YouNiversity will then be able to apply directly to universities on their websites or save university websites to a database for later selection.

### 1 - Use-Cases:
- View recommended countries and cities.	
- Input and search universities by country or city.	
- Click university name to travel to its website.	
- Save university to a database.
- Load universities from a database.	
- Delete university from a database.

### 2 - Hosting:
- Download README.md from https://github.com/20105070/20105070.github.io.
- Open SQL Server Management Studio, click Connect, click New Query, paste the script from README.md's 3, and click Execute.
- Download YouNiversityApi from https://github.com/20105070/20105070.github.io.
- Open Microsoft Visual Studio, click Open a project or solution, open YouNiversityApi.sln, click Start Without Debugging.
- Download YouNiversity from https://github.com/20105070/20105070.github.io.
- Open Visual Studio Code, click File, click Open Folder, click YouNiversity, click Terminal, click New Terminal, type ng serve, and press enter.
- Go to http://localhost:4200/.
- Use YouNiversity according to README.md's 1.

### 3 - Database:
CREATE DATABASE YouNiversity;  
GO  
USE YouNiversity;  
GO  
CREATE TABLE Universities (  
name NVARCHAR(50) NOT NULL PRIMARY KEY,  
webPage NVARCHAR(50) NOT NULL  
);