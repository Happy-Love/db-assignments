'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data ordered by city and then by name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    let result = await db.query(`
        SELECT
           EmployeeID as "Employee Id",
           CONCAT(FirstName, ' ', LastName) AS "Employee Full Name",
           Title as "Title",
           City as "City"
        FROM Employees
        ORDER BY City, "Employee Full Name"
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list ordered by order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    let result = await db.query(`
        SELECT 
            OrderID AS "Order Id", 
            SUM(UnitPrice * Quantity) as "Order Total Price", 
            ROUND(SUM(Discount * Quantity)/SUM(UnitPrice * Quantity) * 100,3) as "Total Order Discount, %"
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY OrderID DESC
        `);
    return result[0];
}
/**
 *  Create a query to return all customers from USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    let result = await db.query(`
    SELECT 
        CustomerID as "CustomerId",
        CompanyName as "CompanyName" 
    FROM Customers
    WHERE Country='USA' AND Fax IS NULL
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all orders |
 *
 * order data by % - higher percent at the top, then by CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    let result = await db.query(`
    SELECT 
        CustomerID as "Customer Id",
        Count(*) as "Total number of Orders",
        Round(Count(*) * 100 / SUM(Count(*)) OVER(),5) as "% of all orders"
    FROM Orders
    GROUP BY CustomerID
    ORDER BY 3 DESC, CustomerID ASC
    `);
    return result[0];
}

/**
 * Return all products where product name starts with 'A', 'B', .... 'F' ordered by name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
    SELECT 
	    ProductID as "ProductId",
        ProductName as "ProductName",
        QuantityPerUnit as "QuantityPerUnit"
    FROM Products
    WHERE ProductName BETWEEN 'A' AND 'G'
    ORDER BY 2
    `);
    return result[0];
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order by ProductName then by SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
    SELECT 
	    p.ProductName as "ProductName",
        c.CategoryName as "CategoryName",
        s.CompanyName as "SupplierCompanyName"
    FROM Products p
    INNER JOIN Categories c ON p.CategoryID=c.CategoryID 
    INNER JOIN Suppliers s ON p.SupplierID=s.SupplierID
    ORDER BY ProductName
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Order data by EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
    SELECT  
	    e.EmployeeID as 'EmployeeId',
	    CONCAT(e.FirstName,' ',e.LastName) as "FullName",
	    COALESCE(CONCAT(r.FirstName,' ',r.LastName),'-') as "ReportsTo"
    FROM Employees e
	LEFT OUTER JOIN Employees r ON r.EmployeeID = e.ReportsTo
    ORDER BY e.EmployeeID
    `);
    return result[0];
}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
    SELECT 
	    c.CategoryName as "CategoryName",
	    Count(p.CategoryID) as "TotalNumberOfProducts"
    FROM Products p
    INNER JOIN Categories c ON p.CategoryID=c.CategoryID
    GROUP BY p.CategoryID
    ORDER BY CategoryName
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and rests may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
    SELECT 
	    CustomerID as "CustomerID",
        ContactName as "ContactName"
    FROM Customers
    WHERE ContactName LIKE "F__n%"
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
    SELECT
        ProductID as "ProductID",
        ProductName as "ProductName"
    FROM Products
    WHERE Discontinued=true
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) where products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order by UnitPrice then by ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
    SELECT
        ProductName as "ProductName",
        UnitPrice as "UnitPrice"
    FROM Products
    WHERE UnitPrice between 5 and 15
    ORDER BY UnitPrice,ProductName
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products by price then by ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
    SELECT 
        UnitPrice as "UnitPrice",
        ProductName as "ProductName"
    FROM(
        SELECT
            UnitPrice as "UnitPrice",
            ProductName as "ProductName"
        FROM Products
        ORDER BY UnitPrice DESC LIMIT 20
    ) as Products
    ORDER BY UnitPrice, ProductName 
    `);
    return result[0];
}

/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
    SELECT
        (SELECT 
            COUNT(*)
        FROM Products) as "TotalOfCurrentProducts",
        (SELECT 
            COUNT(Discontinued)
        FROM Products
        WHERE Discontinued=1) as "TotalOfDiscontinuedProducts"
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on order:
 * | ProductName | UnitsOnOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
    SELECT  
        ProductName as "ProductName",
        UnitsOnOrder as "UnitsOnOrder",
        UnitsInStock as "UnitsInStock"
    FROM Products
    WHERE UnitsOnOrder>UnitsInStock
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
    SELECT  
	    COUNT(IF(MONTHNAME(OrderDate)="January",1,Null))   as "January",
        COUNT(IF(MONTHNAME(OrderDate)="February",1,Null))  as "February",
        COUNT(IF(MONTHNAME(OrderDate)="March",1,Null))     as "March",
        COUNT(IF(MONTHNAME(OrderDate)="April",1,Null))     as "April",
        COUNT(IF(MONTHNAME(OrderDate)="May",1,Null))       as "May",
        COUNT(IF(MONTHNAME(OrderDate)="June",1,Null))      as "June",
        COUNT(IF(MONTHNAME(OrderDate)="July",1,Null))      as "July",
        COUNT(IF(MONTHNAME(OrderDate)="August",1,Null))    as "August",
        COUNT(IF(MONTHNAME(OrderDate)="September",1,Null)) as "September",
        COUNT(IF(MONTHNAME(OrderDate)="October",1,Null))   as "October",
        COUNT(IF(MONTHNAME(OrderDate)="November",1,Null))  as "November",
	    COUNT(IF(MONTHNAME(OrderDate)="December",1,Null))  as "December"
    FROM Orders 
    WHERE YEAR(OrderDate)='1997'
    ORDER BY OrderDate
    `);
    return result[0];
}

/**
 * Create a SQL query to return all orders where ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
    SELECT  
        OrderID as "OrderID",
        CustomerID as "CustomerID",
        ShipCountry as "ShipCountry"
    FROM Orders
    WHERE ShipPostalCode IS NOT NULL
    `);
    return result[0];
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order by AvgPrice descending then by CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
    SELECT  
	    CategoryName as "CategoryName",
	    avg(UnitPrice) as "AvgPrice"
    FROM Products p
    INNER JOIN Categories c ON c.CategoryID=p.CategoryID
    GROUP BY 1
    ORDER BY 2 DESC
    `);
    return result[0];
}

/**
 * Create a SQL query to calcualte total orders count by each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * OrderDate needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
    Select  
        DATE_FORMAT(OrderDate, '%Y-%m-%d %T') as "OrderDate",
	    COUNT(OrderID) as "Total Number of Orders"
    FROM Orders
    WHERE year(OrderDate)='1998'
    GROUP BY OrderDate
    `);
    return result[0];
}

/**
 * Create a SQL query to display customer details whose total orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order by "TotalOrdersAmount, $" descending then by CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
    SELECT 
        c.CustomerID as "CustomerID",
        c.CompanyName as "CompanyName",
        SUM(od.UnitPrice * od.Quantity) as "TotalOrdersAmount, $"
    FROM Customers as c
    INNER JOIN Orders as o ON o.CustomerID = c.CustomerID
    INNER JOIN OrderDetails as od ON od.OrderID = o.OrderID
    GROUP BY CustomerID
    HAVING \`TotalOrdersAmount, $\` > 10000 
    ORDER BY 3 DESC, 1
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
    SELECT 
        e.EmployeeID as "EmployeeID",
        CONCAT(e.FirstName, ' ', e.LastName ) as "Employee Full Name",
        SUM(od.UnitPrice * od.Quantity ) as "Amount, $"
    FROM Employees e 
    INNER JOIN Orders o ON e.EmployeeID = o.EmployeeID
    INNER JOIN OrderDetails od ON o.OrderID = od.OrderID
    GROUP BY e.EmployeeID
    ORDER BY 3 DESC 
    LIMIT 1
    `);
    return result[0];
}

/**
 * Write a SQL statement to get the maximum purchase amount of all the orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
    SELECT  
	    OrderID as "OrderID",
	    SUM(UnitPrice*Quantity) AS "Maximum Purchase Amount, $"
    FROM OrderDetails 
    GROUP BY OrderID
    ORDER BY 2 desc 
    LIMIT 1
    `);
    return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * order by PricePerItem descending and them by CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(` 
    SELECT 
	    DISTINCT CompanyName as "CompanyName",
        p.ProductName as "ProductName",
        PricePerItem as "PricePerItem"
    FROM
        (
        SELECT  
		    Customers.CompanyName, 
		    Customers.CustomerID, 
		    MAX(OrderDetails.UnitPrice) AS "PricePerItem"
	    FROM Customers 
	    INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID 
	    INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID 
	    GROUP BY CompanyName, CustomerID) as PriceTable
    INNER JOIN Orders ON PriceTable.CustomerID = Orders.CustomerID 
    INNER JOIN OrderDetails ON PricePerItem = OrderDetails.UnitPrice AND Orders.OrderID = OrderDetails.OrderID 
    INNER JOIN Products p ON p.ProductID = OrderDetails.ProductID 
    ORDER BY PricePerItem DESC, CompanyName, ProductName;
    `); 
    return result[0];     
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};
