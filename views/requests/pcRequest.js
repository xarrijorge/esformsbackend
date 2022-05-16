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

    // let director = user['Director']

    // let recipient =
    //     totalArr.reduce((x, y) => x + y) <= 50000
    //         ? user['Line Manager Email Address']
    //         : director

    return {
        to: [user['Employee Email Address']],
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ES PettyCash Form</title>
  <style>
    #pettycash {
      margin: 3rem auto;
    }

    #pettycash caption {
      margin-bottom: 2rem;
      font-size: 2rem;
      font-family: Agency, sans-serif;
    }

    #pettycash td,
    #pettycash th {
      text-align: center;
      padding: 10px;
    }

    #pettycash th {
      color: #fff;
      background-color: #000;
      font-weight: normal;
      width: 100px;
      height: 10px;
      
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

    header {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }

    header section {
      display: flex;
      flex-direction: row;
      font-size: 14px;
    }

    header h4 {
      margin: 20px;
    }

    header h3 {
      margin: 10px;
    }

    button {
      width: 150px;
      height: 40px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px;
    }

    button a {
      color: white;
      font-size: 16px;
      text-decoration: none;
    }

    #approve {
      background-color: blue;
    }

    #reject {
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
        <th>Name</th>
        <th>Description</th>
        <th>Unit Cost</th>
        <th>Quantity</th>
        <th>Total</th>
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
        <h3>Invoices <a href=${req.invoices}>HERE</a></h3>
        <button id="approve"><a href="https://esformsbackend.herokuapp.com/approve?id=${id}">Approve</a></button> 
        <button id="reject"><a href="https://esformsbackend.herokuapp.com/reject?id=${id}">Reject</a></button>
      </td>
    </tfoot>
  </table>
</body>
</html>
   
        `,
    }
}
