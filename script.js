(function() {
    var dataLayer = window.dataLayer || [];
    function promptWithValidation(question, choices) {
        var response;
        do {
            response = prompt(question + "\n" + choices.map((choice, index) => (index + 1) + ". " + choice).join("\n"));
        } while (!choices.map((_, index) => String(index + 1)).includes(response));
        return response;
    }

    var userAction = promptWithValidation(
        "Is the event tracking a user interaction or virtual page view?",
        ["user_interaction", "virtual_page_view"]
    );

    var eventData = {
        event: "charter_event",
        user_action: userAction === "1" ? "interaction" : "virtual_page_view",
        user_action_detail: "",
        ux_element: "",
        child_element_text: "",
        child_ux_element_link: ""
    };

    if (userAction === "2") {
        var pageName = prompt("What is the name of the 'page' or screen you want to track?");
        eventData.user_action_detail = pageName;
    } else if (userAction === "1") {
        var interactionChoices = ["click", "submit", "play", "pause", "download", "other"];
        var interactionType = promptWithValidation(
            "What best describes the type of user interaction you are hoping to track?",
            interactionChoices
        );
        eventData.user_action_detail = interactionChoices[parseInt(interactionType) - 1];

        var elementTypeChoices = [
            "button", "header", "footer", "video", "survey", "form", "image",
            "carousel", "hyperlink", "accordion", "tab", "modal", "input field",
            "radio buttons", "checkbox", "social share", "search", "other"
        ];
        var elementType = promptWithValidation(
            "What best describes the element type of interaction you are hoping to track?",
            elementTypeChoices
        );
        eventData.ux_element = elementTypeChoices[parseInt(elementType) - 1];

        var elementText = prompt("What best describes the text of the clicked element?");
        eventData.child_element_text = elementText;

        var isLink = promptWithValidation(
            "Is the element interaction a link that takes the user somewhere? (Y/N)",
            ["Y", "N"]
        );
        if (isLink.toUpperCase() === "Y") {
            var linkURL = prompt("What is the URL where the link takes the user?");
            eventData.child_ux_element_link = linkURL;
        } else {
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
