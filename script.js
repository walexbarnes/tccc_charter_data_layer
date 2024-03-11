(function() {
    var dataLayer = window.dataLayer || [];
    var userAction = prompt("Is the event tracking a user interaction or virtual page view? (user_interaction/virtual_page_view)");

    var eventData = {
        event: "charter_event",
        user_action: "",
        user_action_detail: "",
        ux_element: "",
        child_element_text: "",
        child_ux_element_link: ""
    };

    if (userAction === "virtual_page_view") {
        eventData.user_action = "virtual_page_view";
        var pageName = prompt("What is the name of the 'page' or screen you want to track?");
        eventData.user_action_detail = pageName;
    } else if (userAction === "user_interaction") {
        eventData.user_action = "interaction";
        var interactionType = prompt("What best describes the type of user interaction you are hoping to track? (click, submit, play, pause, download, other)");
        eventData.user_action_detail = interactionType;

        var elementType = prompt("What best describes the element type of interaction you are hoping to track? (button, header, footer, video, survey, form, image, carousel, hyperlink, accordion, tab, modal, input field, radio buttons, checkbox, social share, search, other)");
        eventData.ux_element = elementType;

        var elementText = prompt("What best describes the text of the clicked element?");
        eventData.child_element_text = elementText;

        var isLink = prompt("Is the element interaction a link that takes the user somewhere? (Y/N)");
        if (isLink.toUpperCase() === "Y") {
            var linkURL = prompt("What is the URL where the link takes the user?");
            eventData.child_ux_element_link = linkURL;
        } else {
            // Removing link-related property if it's not a link
            delete eventData.child_ux_element_link;
        }
    } else {
        console.log("Invalid entry. Please start over.");
        return;
    }

    // Clean up empty fields before pushing to dataLayer
    Object.keys(eventData).forEach(key => {
        if (eventData[key] === "") {
            delete eventData[key];
        }
    });

    // Display the final dataLayer object in an alert pop-up
    alert("Generated dataLayer push object:\n" + JSON.stringify(eventData, null, 2));
    dataLayer.push(eventData);
})();
