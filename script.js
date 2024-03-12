(function() {
    var dataLayer = window.dataLayer || [];
    function promptWithValidation(question, choices) {
        var response;
        do {
            response = prompt(question + "\n" + choices.map((choice, index) => (index + 1) + ". " + choice).join("\n"));
            if (!response) { // User cancelled the prompt
                alert("Please refresh the page to start over because you made a mistake");
                throw new Error("Operation cancelled by the user.");
            }
        } while (!choices.map((_, index) => String(index + 1)).includes(response));
        return response;
    }

    try {
        var userAction = promptWithValidation(
            "Is the event tracking a user interaction or virtual page view?",
            ["user_interaction", "virtual_page_view"]
        );

        var eventData = {
            event: "charter_event",
            user_action: userAction === "1" ? "interaction" : "virtual_page_view",
            user_action_detail: "",
            ux_element: "",
            child_ux_element_text: "",
            child_ux_element_link: ""
        };

        if (userAction === "2") {
            var pageName = prompt("What is the name of the 'page' or screen you want to track?");
            eventData.user_action_detail = pageName;
        } else if (userAction === "1") {
            var interactionType = promptWithValidation(
                "What best describes the type of user interaction you are hoping to track?",
                ["click", "submit", "play", "pause", "download", "other"]
            );
            eventData.user_action_detail = ["click", "submit", "play", "pause", "download", "other"][parseInt(interactionType) - 1];

            var elementType = promptWithValidation(
                "What best describes the element type of interaction you are hoping to track?",
                ["button", "header", "footer", "video", "survey", "form", "image", "carousel", "hyperlink", "accordion", "tab", "modal", "input field", "radio buttons", "checkbox", "social share", "search", "other"]
            );
            eventData.ux_element = ["button", "header", "footer", "video", "survey", "form", "image", "carousel", "hyperlink", "accordion", "tab", "modal", "input field", "radio buttons", "checkbox", "social share", "search", "other"][parseInt(elementType) - 1];

            var elementText = prompt("What best describes the text of the clicked element?");
            eventData.child_ux_element_text = elementText;

            var isLink = promptWithValidation(
                "Is the element interaction a link that takes the user somewhere? (Y/N)",
                ["Y", "N"]
            );
            if (isLink.toUpperCase() === "1") {
                var linkURL = prompt("What is the URL where the link takes the user?");
                eventData.child_ux_element_link = linkURL;
            } else {
                delete eventData.child_ux_element_link;
            }
        }

        // Clean up empty fields before pushing to dataLayer
        Object.keys(eventData).forEach(key => {
            if (eventData[key] === "") {
                delete eventData[key];
            }
        });

        // Output to HTML
        document.getElementById('output').innerText = "dataLayer.push(" + JSON.stringify(eventData, null, 2) + ");";
        dataLayer.push(eventData);
    } catch (error) {
        alert("Please refresh the page to start over because you made a mistake.");
    }
})();
