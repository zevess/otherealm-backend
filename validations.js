import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5})
]

export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('name', 'укажите никнейм').isLength({min: 3}),
    body('avatarUrl', 'неверная ссылка').optional().isURL(),
]

export const commentCreateValidation = [
    body('postId', 'введите id страницы').isLength({min: 5}),
    body('text', 'введите текст коммента').isLength({min: 3}).isString()
]

export const discussCreateValidation = [
    body('title', 'введите заголовок обсуждения').isLength({min: 3}).isString(),
    body('postId', 'введите id страницы').isLength({min: 5}),
    body('text', 'введите текст обсуждения').isLength({min: 10}).isString(),
    body('imageUrl', 'неверная ссылка на изображение').optional().isString()
]