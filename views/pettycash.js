module.exports = function (user, req) {
    let data = req['items']
    let viewData = ''
    let totalArr = []

    for (const item in data) {
        totalArr.push(parseInt(`${data[item].total}`))
        viewData += `<tr><td>${item}</td>`
        viewData += `<td>${data[item].cost}</td>`
        viewData += `<td>${data[item].amount}</td>`
        viewData += `<td>${data[item].total}</td></tr>`
    }

    return {
        to: [`${user['Line Manager Email Address']}`],
        // to: 'randy.george@easysolar.org',
        bcc: ['muctarr.rahim@easysolar.org', 'randy.george@easysolar.org'],
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Perdiem request from ${user['Full Name']}`,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: max-content;
        }

        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 10px 20px;
        }

        tr:nth-child(even) {
        background-color: #dddddd;
        }
        tfoot{
            font-weight: bold;
        }
        </style>
        </head>
        <body>
        <div id="pettycash">
            <p>Requester's Name: ${user['Full Name']}</p>
            <p>Requester Department: ${user['Department']}</p>
            <p>Requester Position: ${user['Job Title']}</p>
            <p>Account #: ${req.accountnumber}</p>
            <p>Account Name: ${req.accountname}</p>
            <p>Budget Code: ${req.budgetcode}</p>
        <table id='itemsTable'>
        <tr>
            <th>Item</th>
            <th>Unit cost</th>
            <th>Quantity</th>
            <th>Total</th>
            ${viewData}
            <tfoot>
                <td>TOTAL</td>
                <td>-</td>
                <td>-</td>
                <td>${totalArr.reduce((a, b) => a + b)}</td>
            </tfoot>
        </tr>
        
        </table>
        </div>

        </body>
        </html>
        `,
    }
}
