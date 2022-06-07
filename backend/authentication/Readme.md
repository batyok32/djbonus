AUTHENTICATION APP
Provides rest api for react and django authentication

Using:
django-cors-headers
django-filter
django-rest-auth
djangorestframework
djangorestframework-simplejwt
djoser
django_filter

Start to use:
1. Go to settings add this apps to installed apps:
'authentication',
'corsheaders',
'rest_framework',
'djoser',
'django_filters',

1. Add Middleware
'corsheaders.middleware.CorsMiddleware',

1. ADD THIS CONFS:

REST_FRAMEWORK = {

    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend', ],

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S",

}


CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('JWT',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_USER_MODEL = 'authentication.User'

DJOSER = {
    # 'LOGIN_FIELD': 'username',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': False,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': False,
    'SEND_CONFIRMATION_EMAIL': False,
    # if true you need to pass re_new_username to /users/set_username/ endpoint,
    # to validate username equality
    'SET_USERNAME_RETYPE': True,
    # if true you need to pass re_new_password to /users/set_password/ endpoint,
    # to validate username equality
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'http://localhost:3000/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'http://localhost:3000/email/reset/confirm/{uid}/{token}',
    # 'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': False,
    'HIDE_USERS': True,
    'SERIALIZERS': {
        'user_create': 'authentication.serializers.UserCreateeSerializer',
        'user': 'authentication.serializers.UserCreateeSerializer',
        'current_user': 'authentication.serializers.UserDetailSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    }

}

2. Modify models

Models are trained for three types of users
Admin users, company users, client users

Change profiles

If you change basic user fields change it in forms.py

3. Modify admin

4. Modify urls 
Take only using urls
