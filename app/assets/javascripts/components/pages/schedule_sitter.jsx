// TODO this should check to make sure we have tokens
var ScheduleSitterPage = React.createClass({

    handleScheduleSitter: function() {
        var startDate = this.refs.startDate.value,
            startTime = this.refs.startTime.value,
            duration  = this.refs.duration.value,
            details   = this.refs.details.value;

        var startDateTime = startDate + ' ' + startTime;
        console.log("Scheduling sitter for: ", startDateTime);
        console.log("Duration: ", duration);
        console.log("Details: ", details);

//        $.ajax({
//            context: this,
//            type: 'POST',
//            url: '/schedule_sitter',
//            data: {
//                startDateTime: this.refs.startDateTime.value,
//                endDateTime:   this.refs.endDateTime.value,
//                details:       this.refs.details.value
//            },
//            contentType: 'application/json',
//            dataType: 'json',
//            success: function(result)
//            {
//                console.log("Successfully scheduled sitters.");
//            }
//        });
    },

    componentDidMount: function() {
        $('.datepicker').datepicker({
            minDate: 0
        });

    },

    render: function() {
        var startTimeHours = ['12'];
        for (var i = 1; i < 12; i++) { startTimeHours.push('' + i); }

        var startTimeHoursAndMinutes = [];
        for (var i in startTimeHours)
        {
            startTimeHoursAndMinutes.push(startTimeHours[i] + ':00');
            startTimeHoursAndMinutes.push(startTimeHours[i] + ':30');
        }

        var startTimeOptions = [];
        for (var i in startTimeHoursAndMinutes)
        {
            startTimeOptions.push(<option>{startTimeHoursAndMinutes[i] + ' AM'}</option>);
        }
        for (var i in startTimeHoursAndMinutes)
        {
            startTimeOptions.push(<option>{startTimeHoursAndMinutes[i] + ' PM'}</option>);
        }

        var durationOptions = [];
        for (var i = 0.5; i <= 8.0; i = i + 0.5)
        {
            durationOptions.push(<option>{'' + i}</option>);
        }
        durationOptions.push(<option>{'other'}</option>);

        return (
            <div className="schedule-sitter-page">
                <BabySitterAppHeader back='landing' />
                Ready to schedule a sitter? Great! Just enter the following details, and we'll take care of the rest.

                <table>
                    <tr className="input-wrapper">
                        <td><label>Date you need a sitter: </label></td>
                        <td><input type="text" ref="startDate" className="datepicker" /></td>
                    </tr>
                    <tr className="input-wrapper">
                        <td><label>Starting at time: </label></td>
                        <td>
                            <select ref="startTime">
                                {startTimeOptions}
                            </select>
                        </td>
                    </tr>
                    <tr className="input-wrapper">
                        <td><label>For how long: </label></td>
                        <td>
                            <select ref="duration">
                                {durationOptions}
                            </select>
                        </td>
                    </tr>

                </table>

                <div className="input-wrapper">
                    <label>Details for the sitter (e.g. where you'll be, will provide dinner, etc.):</label>
                </div>
                <div className="input-wrapper">
                    <textarea ref="details"></textarea>
                </div>
                
                <button onClick={this.handleScheduleSitter}>Schedule a Sitter</button>
            </div>
        );
    }
});