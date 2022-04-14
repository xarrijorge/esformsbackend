const submitText = `<!DOCTYPE html>
<html>
    <head>
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td,
            th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    </head>
    <body>
        <img
            src="https://easysolar.org/static/media/easy-logo-1.48ac0032.svg"
            alt="easy solar logo"
        />
        <h2>Per Diem Request from ${data['Full Name']}, ${data['Job Title']}</h2>

        <table>
            <tr>
                <th>Question</th>
                <th>Response</th>
            </tr>
            <tr>
                <td>Destination</td>
                <td>${data.destination}</td>
            </tr>
            <tr>
                <td>Number of Nights</td>
                <td>${data.nights}</td>
            </tr>
            <tr>
                <td>Number of Days</td>
                <td>${data.days}</td>
            </tr>
            <tr>
                <td>Purpose of Trip</td>
                <td>${data.purpose}</td>
            </tr>
            <tr>
                <td>Vehicle Requested</td>
                <td>${data.vehicle}</td>
            </tr>
            <tr>
                <td>Number of Passengers</td>
                <td>${data.passengers}</td>
            </tr>
            <tr>
                <td>Number of sprequest</td>
                <td>${data.requests}</td>
            </tr>
        </table>
        <h4>Claims</h4>
        <table>
            <th>item</th>
            <th>Amount</th>
            <tr>
                <td>Accommodation</td>
                <td>${data.nights}</td>
            </tr>
            <tr>
                <td>Meals</td>
                <td>${data.days}</td>
            </tr>
            <tfoot>
                <tr>
                    <td>TOTAL CLAIM</td>
                    <td>${data.TOTALCLAIM}</td>
                </tr>
            </tfoot>
        </table>

        <h3>Approval Section</h3>
        <button>
            <a href="https://shielded-plains-53385.herokuapp.com/approve"
                >Approve</a
            >
        </button>
        <button>
            <a href="https://shielded-plains-53385.herokuapp.com/reject"
                >Reject</a
            >
        </button>
    </body>
</html>`
