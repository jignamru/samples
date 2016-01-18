// TODO this should check to make sure we have tokens
var ScheduleSitterPage = React.createClass({

    propTypes: {
        gotoPage: React.PropTypes.func
    },

    handleScheduleSitter: function() {
        console.log("Scheduling sitter...");
        $.ajax({
            context: this,
            type: 'POST',
            url: '/schedule_sitter',
            data: {
                startDateTime: this.refs.startDateTime.value,
                endDateTime:   this.refs.endDateTime.value,
                details:       this.refs.details.value
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log("Successfully scheduled sitters.");
            }
        });
    },

    render: function() {
        return (
            <div className="schedule-sitter-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
                Ready to schedule a sitter? Great! Just enter the following details, and we'll take care of the rest.

                <div>Start date and time: <input type="text" ref="startDateTime" /></div>
                <div>End date and time: <input type="text" ref="endDateTime" /></div>

                <div>Give us some details we can share with the sitters (e.g. where you'll be, will provide dinner, etc.):</div>
                <textarea ref="details"></textarea>
                <hr />
                <button onClick={this.handleScheduleSitter}>Schedule a Sitter</button>
            </div>
        );
    }
});