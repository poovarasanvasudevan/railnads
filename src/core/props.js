export const CollapseProps = {
    lines: 3,
    more: 'Show more',
    less: 'Show less',
    anchorClass: 'text-blue-600 font-bold',
    expanded: false
}


export const avatarGenerate = (email) => {
    return "http://localhost:1337/avatar?email=" + email
}
