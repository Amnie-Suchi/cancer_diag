$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Scroll down to the classifier section
    function scrollToSection() {
        document.getElementById("try-it").scrollIntoView({ behavior: 'smooth' });
    }

      // Event listener for image upload
    $("#imageUpload").change(function () {
        $('.image-section').show();  // Show the image section
        $('#btn-predict').show();    // Show the predict button
        $('#result').text('');       // Clear any previous result
        $('#result').hide();         // Hide result section
        readURL(this);               // Call readURL function for image preview
    });

    // Function to read the uploaded image and show a preview
    function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);  // Smooth fade-in effect
        }
        reader.readAsDataURL(input.files[0]); // Read the file and convert to data URL
    }
}


    // Prediction button click event
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);   //get the actual photo

        // Hide the button and show the loader animation
        $(this).hide();
        $('.loader').show();

        // Make an AJAX request to send the form data to the server for prediction
        $.ajax({
            type: 'POST',
            url: '/predict',       // Server-side route to handle predictions
            data: form_data,       // Form data including the uploaded image
            contentType: false,    // Don't set content type, let the browser handle it
            cache: false,          // Disable caching of the response
            processData: false,    // Don't process the data (as we're sending a file)
            async: true,           // Make the request asynchronously
            success: function (data) {
                // Hide the loader and show the result section
                $('.loader').hide();
                $('#result').fadeIn(600);

                // Show the prediction result in the #result element
                $('#result').text('Result: ' + data.prediction);
                console.log('Success! Prediction received.');
            },
            error: function (error) {
                // Handle any error that occurs during the request
                console.error('Error during prediction:', error);
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text('Error occurred while making the prediction.');
            }
        });
    });
});
