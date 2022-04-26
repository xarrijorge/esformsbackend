module.exports = function (user, req) {
    let tableData = document.getElementById('itemsTable')

    let data = req['items']

    for (const item in data.items) {
        let newRow = tableData.insertRow(-1)
        newRow.insertCell(0).innerHTML = `${item}`
        newRow.insertCell(1).innerHTML = `${data.items[item].cost}`
        newRow.insertCell(2).innerHTML = `${data.items[item].amount}`
        newRow.insertCell(3).innerHTML = `${data.items[item].total}`
    }
    return {
        to: [`${user['Line Manager Email Address']}`],
        cc: ['muctarr.rahim@easysolar.org', 'randy.george@easysolar.org'],
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
        </style>
        </head>
        <body>
        <div id="pettycash">
            <p>Bank Name: UBA</p>
            <p>Account #: 554821347896</p>
            <p>Account Name: Eric Bailey</p>
            <p>Budget Code: 104</p>
        <table id='itemsTable'>
        <tr>
            <th>Item</th>
            <th>Unit cost</th>
            <th>Amount</th>
            <th>Total</th>
        </tr>
        
        </table>
        </div>

        </body>
        </html>
        `,
    }
}
