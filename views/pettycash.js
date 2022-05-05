module.exports = function (user, req, id) {
    let data = req['items']
    let viewData = ''
    let totalArr = []

    for (const item in data) {
        totalArr.push(parseInt(`${data[item].total}`))
        viewData += `<tr><td>${data[item].name}</td>`
        viewData += `<td>${data[item].description}</td>`
        viewData += `<td>${data[item].cost}</td>`
        viewData += `<td>${data[item].amount}</td>`
        viewData += `<td>${data[item].total}</td></tr>`
    }

    let director = user['Director']

    let recipient =
        totalArr.reduce((x, y) => x + y) <= 50000
            ? user['Line Manager Email Address']
            : director

    return {
        to: [recipient],
        // to: 'randy.george@easysolar.org',
        bcc: ['muctarr.rahim@easysolar.org', 'randy.george@easysolar.org'],
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Petty Cash Request from ${user['Full Name']}`,
        html: `
        <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>ES PettyCash Form</title>
        <style>
           #pettycash {
             width: 15cm;
            height: 29cm;
            margin: 3rem auto;
            }

            #pettycash caption {
                margin-bottom: 2rem;
                font-size: 2rem;
                font-family: Agency, sans-serif;
              color: #000000;
            }

            #pettycash td,
            #pettycash th {
                text-align: center;
                padding: 2rem;
            }

            #pettycash th {
                color: #fff;
                background-color: #000;
                font-weight: normal;
            }

            #pettycash tbody {
                border: 1px solid #222;
            }

            #pettycash tbody th,
            #pettycash tbody th + td {
                text-align: left;
                font-weight: normal;
            }

            #pettycash tbody th {
                font-size: 1.4rem;
                border-right: 1px solid #222;
                font-family: Agency, Arial, sans-serif;
                text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
            }

            #pettycash tbody tr:not(:last-child) {
                border-bottom: 1px solid #222;
            }

            #pettycash thead th {
                border: 1px solid #222;
                border-bottom: none;
            }

            #pettycash tbody td:not(:last-child) {
                border-right: 1px solid #222;
            }

            #pettycash tbody td {
                background: hsl(195, 100%, 20%);
                color: #fff;
            }

            @media screen and (max-width: 500px) {
                #pettycash td,
                #pettycash th {
                    padding: 0.5rem;
                }
                #pettycash th span {
                    display: none;
                }
            }
          header{
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #000000;
          }
          header section{
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color: #000000;
          }
          header h4{
            margin: 20px;
          }
          header h3{
            margin: 10px;
          }
          button{
            width: 150px;
            height: 40px;
            outline: none;
            border: none;
            border-radius: 5px;
            margin: 10px;
            
          }
          button a{
            color: white;
            font-size: 16px;
            text-decoration: none;
          }
          #approve{
            background-color: blue;
          }
          #reject{
            background-color: red;
          }
          </style> 
    </head>
    <body>
      
        <table id="pettycash">
            <caption>
                Petty Cash Request
              <header>
        <h3>Requester: ${user['Full Name']}</h3>
        <section>
        <h4>${user['Job Title']}</h4>
          <h4>Account Name: ${req.accountname}</h4>
          <h4>B-Band #: ${req.bbandnumber}</h4>
          <h4>Mobile Money #: ${req.momonumber}</h4>
        </section>
        
      </header>
            </caption>
          
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Unit Cost</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
               ${viewData}
            <tr>
                <td> Total</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>$${totalArr.reduce((x, y) => x + y)}</td>
            </tr>
            </tbody>
            <tfoot>
           
                <td>
                    <h3>Invoices <a href="${req.invoices}">HERE</a></h3>
                  <button id="approve"><a style="color: white" href="https://esformsbackend.herokuapp.com/approve/pettycash?id=${id}">Approve</a></button> 
                  <button id="reject"><a style="color: white" href="https://esformsbackend.herokuapp.com/reject/pettycash?id=${id}">Reject</a></button>
                </td>
            </tfoot>
        </table>
    </body>
</html>
   
        `,
    }
}
