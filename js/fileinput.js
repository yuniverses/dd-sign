const dropbox = document.getElementById("upload_zone");
    const preview = document.getElementById("preview");

    function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();
        const fileUploader = document.getElementById("fileUploader");
        fileUploader.click();
    }

    const click = e => handleFileSelect(e);

    // prevent the default method working
    function dragenter(e) {
        // add the styling to div
        dropbox.classList.add("upload_zone_enter");
        e.stopPropagation();
        e.preventDefault();
    }

    const dragleave = () => dropbox.classList.remove("upload_zone_enter");

    // prevent the default method working
    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            const file = files[i];
            const imageType = /image.*/;

            if (!file.type.match(imageType)) {
                continue;
            }

            const img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            preview.appendChild(img);

            const reader = new FileReader();
            reader.onload = (e => img.src = e.target.result);
            reader.readAsDataURL(file);
        }
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
        dropbox.classList.remove("upload_zone_enter");
    }

    dropbox.addEventListener("click", click, false);
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragleave", dragleave, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);