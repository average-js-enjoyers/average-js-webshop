Get-ChildItem -Recurse -Filter *.json | ForEach-Object {
    $newName = $_.FullName -replace '\.json$', '.js'
    Rename-Item $_.FullName $newName
}
